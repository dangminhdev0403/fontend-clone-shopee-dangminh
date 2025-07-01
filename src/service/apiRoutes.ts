const version = `/api/v1`;
export const API_ROUTES = {
  AUTH: {
    LOGIN: `${version}/auth/login`,
    REGISTER: `${version}/auth/register`,
    LOGOUT: `${version}/auth/logout`,
    REFRESH: `${version}/auth/refresh`,
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
  LOCATION: {
    PROVINCES: `${version}/provinces`,
  },
  CART: {
    GET: `${version}/products/get-cart`,
    ADD: `${version}/products/add-to-cart`,
    REMOVE: `${version}/products/remove-from-cart`,
  },
  ADDRESS: {
    PROVINCES: `${version}/provinces`,
    DISTRICTS: `${version}/districts`,
    WARDS: `${version}/wards`,
    ADDRESSES: `${version}/addresses`,
  },
};
