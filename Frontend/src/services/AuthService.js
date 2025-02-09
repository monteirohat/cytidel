// src/services/AuthService.js

import LocalStorageService from "./LocalStorageService";
import SessionStorageService from "./SessionStorageService";

import { request } from "./ApiService";
import { ENDPOINTS } from "../api/Endpoints";

const nameAccessToken = "access-token";
const nameRefreshToken = "refresh-token";
const nameUserData = "user";

export const login = async (email, password, keepLoggedIn) => {
  try {
    const response = await request({
      endpoint: ENDPOINTS.AUTH.LOGIN,
      method: "POST",
      body: { email: email, password: password },
      includeTokens: false, //Not send token
    });

    const data = await response.json();

    // Save tokens
    const accessToken = data.token;
    const refreshToken = data.refreshToken;
 
    const userData  = {
      id : data?.id,
      name: data?.name,
      email: data?.email
    };

    LocalStorageService.clear();
    SessionStorageService.clear();

    if (keepLoggedIn) {
      LocalStorageService.setItem(nameAccessToken, accessToken, false);
      LocalStorageService.setItem(nameRefreshToken, refreshToken, false);
      LocalStorageService.setItem(nameUserData, userData);
    } else {
      SessionStorageService.setItem(nameAccessToken, accessToken, false);
      SessionStorageService.setItem(nameRefreshToken, refreshToken, false);

      SessionStorageService.setItem(nameUserData, userData);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  LocalStorageService.clear();
  SessionStorageService.clear();
};

export const isAuthenticated = () => {
  // 1) Check localStorage tokens 
  const lsAccessToken = LocalStorageService.getItem(nameAccessToken, false);
  const lsRefreshToken = LocalStorageService.getItem(nameRefreshToken, false);
  const lsUserData = LocalStorageService.getItem(nameUserData);

  const localStorageHasTokens =
    lsAccessToken && lsRefreshToken && lsUserData;

  if (localStorageHasTokens) {
    return true;
  }

  // 2) Check sessionStorage token
  const ssAccessToken = SessionStorageService.getItem(nameAccessToken, false);
  const ssRefreshToken = SessionStorageService.getItem(nameRefreshToken, false);
  const ssUserData = SessionStorageService.getItem(nameUserData);

  const sessionStorageHasTokens =
    ssAccessToken && ssRefreshToken  && ssUserData;

  if (sessionStorageHasTokens) {
    return true;
  }

  
  return false;
};

export const getUserData = () => {
  const lsUserData = LocalStorageService.getItem(nameUserData);

  if (lsUserData) return lsUserData;

  const ssUserData = SessionStorageService.getItem(nameUserData);

  if (ssUserData) {
    return ssUserData;
  } else return null;
};


export const clearAuthStorage = async () => {
  LocalStorageService.clear();
  SessionStorageService.clear();
};
