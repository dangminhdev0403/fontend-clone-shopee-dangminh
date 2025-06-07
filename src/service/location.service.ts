import { API_ROUTES } from "@service/apiRoutes";
import { instance } from "@service/axios.custom";
import { PageInfo } from "@utils/constants/types/response";

interface Province {
  id: string;
  name: string;
  // Add other province fields if available
}

interface ProvincesResponse {
  content: Province[];
  page: PageInfo;
  // Add other response fields if available
}

interface LocationApi {
  getProvinces: (params?: Pageable) => Promise<ProvincesResponse>;
}

const locationApi: LocationApi = {
  getProvinces: async (
    params = { page: 1, size: 5 },
  ): Promise<ProvincesResponse> => {
    const response = await instance.get(`${API_ROUTES.LOCATION.PROVINCES}`, {
      params: {
        ...params,
      },
    });
    const { data } = response;

    return data;
  },
};

export default locationApi;
