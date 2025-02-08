// src/services/AuthService.js

import LocalStorageService from "./LocalStorageService";
import SessionStorageService from "./SessionStorageService";

import { request } from "./ApiService";
import { ENDPOINTS } from "../api/Endpoints";

const nameAccessToken = "st-access-token";
const nameRefreshToken = "st-refresh-token";
const nameFrontToken = "front-token";
const nameUserData = "user";

export const login = async (username, password, keepLoggedIn) => {
  try {
    const response = await request({
      endpoint: ENDPOINTS.AUTH.LOGIN,
      method: "POST",
      body: { email: username, password: password },
      includeTokens: false, //Not send token
    });

    // Save tokens
    const accessToken = response.headers.get(nameAccessToken);
    const refreshToken = response.headers.get(nameRefreshToken);
    const frontToken = response.headers.get(nameFrontToken);

    const data = await response.json();

    const userData  = {
      authId : data?.user.authId,
      cpf: data?.user.cpf
    };

    LocalStorageService.clear();
    SessionStorageService.clear();

    if (keepLoggedIn) {
      LocalStorageService.setItem(nameAccessToken, accessToken, false);
      LocalStorageService.setItem(nameRefreshToken, refreshToken, false);
      LocalStorageService.setItem(nameFrontToken, frontToken, false);
      LocalStorageService.setItem(nameUserData, userData);
    } else {
      SessionStorageService.setItem(nameAccessToken, accessToken, false);
      SessionStorageService.setItem(nameRefreshToken, refreshToken, false);
      SessionStorageService.setItem(nameFrontToken, frontToken, false);

      SessionStorageService.setItem(nameUserData, userData);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Função para deslogar o usuário
export const logout = async () => {
  const response = await request({
    endpoint: ENDPOINTS.AUTH.LOGOUT,
    method: "POST",
  });
  LocalStorageService.clear();
  SessionStorageService.clear();
};

export const isAuthenticated = () => {
  // 1) Verifica tokens no localStorage
  const lsAccessToken = LocalStorageService.getItem(nameAccessToken, false);
  const lsRefreshToken = LocalStorageService.getItem(nameRefreshToken, false);
  const lsFrontToken = LocalStorageService.getItem(nameFrontToken, false);
  const lsUserData = LocalStorageService.getItem(nameUserData);

  // Se encontrou todos no LocalStorage, já consideramos autenticado
  const localStorageHasTokens =
    lsAccessToken && lsRefreshToken && lsFrontToken && lsUserData;

  if (localStorageHasTokens) {
    return true;
  }

  // 2) Se não encontrou no LocalStorage, verifica tokens no sessionStorage
  const ssAccessToken = SessionStorageService.getItem(nameAccessToken, false);
  const ssRefreshToken = SessionStorageService.getItem(nameRefreshToken, false);
  const ssFrontToken = SessionStorageService.getItem(nameFrontToken, false);
  const ssUserData = SessionStorageService.getItem(nameUserData);

  const sessionStorageHasTokens =
    ssAccessToken && ssRefreshToken && ssFrontToken && ssUserData;

  if (sessionStorageHasTokens) {
    return true;
  }

  // 3) Se não achou em nenhum dos dois, retorna false (não autenticado)
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

// User logout
export const clearAuthStorage = async () => {
  LocalStorageService.clear();
  SessionStorageService.clear();
};
