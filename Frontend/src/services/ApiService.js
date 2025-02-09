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
 * @param {string} params.endpoint - The endpoint path (e.g., '/users', '/products', etc.)
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

    const response = await fetch(url, options);

    if (!response.ok) {
      await handleResponseError(response);
    }

    return await response;
  } catch (error) {
    console.error("[request] Erro:", error);
    throw error;
  }
}

/**
 * Helper to build dynamic endpoints (e.g., with {id} or {cpf})
 *
 * @param {string} endpoint - The base endpoint (e.g., '/users/{cpf}')
 * @param {Object} params - Object with values to replace the variables (e.g., { cpf: '12345678900' })
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
async function handleResponseError(response) {
  const errorText = await response.json(); // Read the response body (ProblemDetails)

  switch (response.status) {
    case 400:
      console.error(
        "There was an error in the request. Please check the submitted data."
      );
      break;
    case 401:
      console.error("You are not authenticated. Please log in again.");
      break;
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

  // Throw an error with the detail from ProblemDetails
  throw new Error(errorText.detail || "An error occurred.");
}
