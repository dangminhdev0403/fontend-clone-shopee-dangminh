const version = `/api/v1`;
export const API_ROUTES = {
  AUTH: {
    LOGIN: `${version}/auth/login`,
    REGISTER: `${version}/auth/register`,
    LOGOUT: `${version}/auth/logout`,
  },
  PRODUCT: {
    BASE: `${version}/products`,
  
  },
  USER: {
    BASE: `${version}/user`,
    INFO: `${version}/info`,
  },

  CATEGORY: {
    LIST: `${version}/categories`,
  },
};
