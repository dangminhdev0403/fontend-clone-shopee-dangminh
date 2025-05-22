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
  getProductById: async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return response.json();
  },
};

export default productApi;
