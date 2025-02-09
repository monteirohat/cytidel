import { request, buildRouteWithParams } from "./ApiService.js";
import { ENDPOINTS } from "../api/Endpoints.js";


export async function getUsers() {
  const response = await request({
    endpoint: ENDPOINTS.USER.BASE,
    method: "GET",
  });
  return await response;
}

export async function getUserById(id) {
  const endpoint = buildRouteWithParams(ENDPOINTS.USER.BY_ID, { id });

  const response = await request({
    endpoint,
    method: "GET",
  });

  return await response;
}


