import { API_ROUTES } from "@service/apiRoutes";
import { instance } from "@service/axios.custom";
import { ProductListFilter } from "@utils/constants/types/product.type";

const productApi = {
  getAllProducts: async (params: ProductListFilter) => {
    const response = await instance.get(`${API_ROUTES.PRODUCT.BASE}/search`, {
      params: {
        ...params,
      },
    });
    const { data } = response;

    if (data?.page?.number !== undefined) {
      data.page.number += 1;
    }
    return {
      ...response,
      data,
    };
  },
  getProductDetail: async (id: string) => {
    const response = await instance.get(`${API_ROUTES.PRODUCT.BASE}/${id}`);
    const { data } = response;
  
    return data;
  },
  getCategories: async (params?: Pageable) => {
    const response = await instance.get(`${API_ROUTES.CATEGORY.LIST}`, {
      params: {
        ...params,
      },
    });
    const { data } = response;
    return data;
  },
};

export default productApi;
