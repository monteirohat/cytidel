export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/token/refresh",
  },
  TASK: {
    BASE: "/task",
    BY_ID: "/task/{id}",
    STATUS: "/task/{id}/{idStatus}",
  },
  USER: {
    BASE: "/user",
    BY_ID: "/user/{id}",
  },
};
