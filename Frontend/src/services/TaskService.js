import { request, buildRouteWithParams } from "./ApiService.js";
import { ENDPOINTS } from "../api/Endpoints.js";
import * as validator from "../utils/Validator.js";

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
  validateUser(task);
  const response = await request({
    endpoint: ENDPOINTS.TASK.BASE,
    method: "POST",
    body: task,
  });
  return await response.json();
}

export async function updateTask(task) {
  validateUser(task);

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

const validateUser = (user) => {
  if (!user.name || user.name.trim() === "") {
    throw new Error("Nome é obrigatório.");
  }

  if (!user.email || user.email.trim() === "") {
    throw new Error("E-mail é obrigatório.");
  }

  if (!user.cpf || user.cpf.trim() === "") {
    throw new Error("CPF é obrigatório.");
  }

  if (!user.phone || user.phone.trim() === "") {
    throw new Error("Telefone é obrigatório.");
  }

  if (!validator.isCpf(user.cpf)) {
    throw new Error("CPF inválido.");
  }

  if (!validator.isEmail(user.email)) {
    throw new Error("E-mail inválido.");
  }
};
