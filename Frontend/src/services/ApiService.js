import LocalStorageService from "./LocalStorageService";
import SessionStorageService from "./SessionStorageService";

const BASE_URL = "https://127.0.0.1:7081/api";

function buildHeaders(includeTokens = true) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (!includeTokens) {
    return headers;
  }

  let nameAccessToken = "access-token";
  let nameRefreshToken = "refresh-token";

  // Check data in localStorage or sessionStorage
  const accessToken =
    localStorage.getItem(nameAccessToken) ||
    sessionStorage.getItem(nameAccessToken);
  const refreshToken =
    localStorage.getItem(nameRefreshToken) ||
    sessionStorage.getItem(nameRefreshToken);

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

/**
 * Makes a generic HTTP request using fetch, constructing the URL from a dictionary.
 *
 * @param {Object} params
 * @param {string} params.endpoint - The endpoint path
 * @param {string} [params.method='GET'] - HTTP verb (GET, POST, PUT, DELETE, etc.)
 * @param {Object} [params.urlParams={}] - Object containing query string parameters
 * @param {Object|null} [params.body=null] - Object for the request body (if necessary)
 * @returns {Promise<any>} - Returns the response of the request in JSON format
 */
export async function request({
  endpoint,
  method = "GET",
  urlParams = {},
  body = null,
  includeTokens = true,
}) {
  try {
    const queryString = new URLSearchParams(urlParams).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const options = {
      method,
      headers: buildHeaders(includeTokens),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const originalRequest = { url, ...options };
    const response = await fetch(url, options);

    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = null;
    }



    if (!response.ok) {
      await handleResponseError(response, data, originalRequest);
    }

    return data;
  } catch (error) {
    console.error("[request] Erro:", error);
    throw error;
  }
}

/**
 * Helper to build dynamic endpoints
 *
 * @param {string} endpoint - The base endpoint
 * @param {Object} params - Object with values to replace the variables
 * @returns {string} - Endpoint with the variables replaced.
 */
export function buildRouteWithParams(endpoint, params) {
  let resolvedEndpoint = endpoint;

  Object.entries(params).forEach(([key, value]) => {
    resolvedEndpoint = resolvedEndpoint.replace(`{${key}}`, value);
  });

  return resolvedEndpoint;
}

/**
 * Handles response errors based on the status.
 *
 * @param {Response} response - API Response object
 */
async function handleResponseError(response, data, originalRequest) {
  let errorText = {};
  try {
    errorText = await response.json();
  } catch (err) {
    console.warn("Response did not contain valid JSON", err);
  }

  switch (response.status) {
    case 400:
      console.error("There was an error in the request. Please check the submitted data.");
      break;
    case 401:
      console.error("You are not authenticated. Try refresh token.");

      // Prevent infinite loops by checking a retry flag.
      if (originalRequest._retry) {
        // Already retried; clear tokens and redirect.
        LocalStorageService.removeItem("access-token");
        LocalStorageService.removeItem("refresh-token");
        LocalStorageService.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }

      // Mark the request as having been retried.
      originalRequest._retry = true;

      try {
        let nameRefreshToken = "refresh-token";
        let nameUserData = "user";

        const refreshToken =
          LocalStorageService.getItem(nameRefreshToken, false) ||
          SessionStorageService.getItem(nameRefreshToken, false);

        const userData =
          LocalStorageService.getItem(nameUserData) ||
          SessionStorageService.getItem(nameUserData);

          if (!userData || !userData.id) {
            window.location.href = "/login";
            throw new Error("Session expired. Please log in again.");
          }



        // Attempt to refresh the token
        const refreshResponse = await fetch(`${BASE_URL}/auth/token/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userData.id,
            refreshToken: refreshToken,
          }),
        });

        if (refreshResponse.ok) {
          const { token, refreshToken } = await refreshResponse.json();

          // Update tokens in storage
          LocalStorageService.setItem("access-token", token, false);
          LocalStorageService.setItem("refresh-token", refreshToken, false);

          // Retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return await fetch(originalRequest.url, originalRequest);
        } else {
          // Refresh failed – clear tokens and redirect to login
          LocalStorageService.removeItem("access-token");
          LocalStorageService.removeItem("refresh-token");
          LocalStorageService.removeItem("user");

          window.location.href = "/login";
          throw new Error("Session expired. Please log in again.");
        }
      } catch (error) {
        // In case of an error during refresh, clear tokens and redirect
        LocalStorageService.removeItem("access-token");
        LocalStorageService.removeItem("refresh-token");
        LocalStorageService.removeItem("user");
        window.location.href = "/login";
        throw error;
      }

    case 403:
      console.error("You do not have permission to access this resource.");
      break;
    case 404:
      console.error("The requested resource was not found.");
      break;
    case 500:
      console.error("Internal server error. Please try again later.");
      break;
    default:
      console.error("An unknown error occurred. Please try again.");
  }

  throw new Error(errorText.detail || "An error occurred.");
}
