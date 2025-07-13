const version = `/api/v1`;
const apiLocation =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data";
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
  CART: {
    GET: `${version}/products/get-cart`,
    ADD: `${version}/products/add-to-cart`,
    REMOVE: `${version}/products/remove-from-cart`,
  },
  ADDRESS: {
    PROVINCES: `${apiLocation}/province`,
    DISTRICTS: `${apiLocation}/district`,
    WARDS: `${apiLocation}/ward`,
    ADDRESSES: `${version}/addresses`,
  },
};
