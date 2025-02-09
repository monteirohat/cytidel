import { request, buildRouteWithParams } from "./ApiService.js";
import { ENDPOINTS } from "../api/Endpoints.js";


export async function getTasks() {
  const response = await request({
    endpoint: ENDPOINTS.TASK.BASE,
    method: "GET",
  });
  return await response.json();
}

export async function getTaskById(id) {
  const endpoint = buildRouteWithParams(ENDPOINTS.TASK.BY_ID, { id });

  const response = await request({
    endpoint,
    method: "GET",
  });

  return await response.json();
}

export async function createTask(task) {
  const response = await request({
    endpoint: ENDPOINTS.TASK.BASE,
    method: "POST",
    body: task,
  });
  return await response.json();
}

export async function updateTask(task) {
  
  return request({
    endpoint: ENDPOINTS.TASK.BASE,
    method: "PUT",
    body: task,
  });
}

export async function deleteTask(id) {
  const endpoint = buildRouteWithParams(ENDPOINTS.TASK.BY_ID, { id });

  return request({
    endpoint,
    method: "DELETE",
  });
}

export async function changeStatusTask(id, idStatus) {
  const endpoint = buildRouteWithParams(ENDPOINTS.TASK.STATUS, { id, idStatus });

  return request({
    endpoint,
    method: "PATCH",
  });
}



