// list of backend routes

export const API = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    UPDATE_PROFILE: "/auth/update-profile",
    REQUEST_RESET_PASSWORD: "/auth/request-password-reset",
    RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    CHANGE_PASSWORD: (token: string) => `/auth/change-password/${token}`,
  },
  ADMIN: {
    USER: {
      CREATE_USER: "/admin/users/",
      GET_ALL_USERS: "/admin/users/",
      GET_ONE: (userId: string) => `/admin/users/${userId}`,
      UPDATE: (userId: string) => `/admin/users/${userId}`,
      DELETE: (userId: string) => `/admin/users/${userId}`,
    },
  },
};
