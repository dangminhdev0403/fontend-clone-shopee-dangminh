import { API_ROUTES } from "@service/apiRoutes";
import { instance } from "@service/axios.custom";

export const getCategories = async () => {
  const URL_BACKEND = API_ROUTES.CATEGORY.LIST;
  const res = await instance.get(URL_BACKEND);

  return res.data;
};

