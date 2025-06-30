import { rootApi } from "@redux/api/rootApi";
import { API_ROUTES } from "@service/apiRoutes";

// DTO đúng
export interface LocationDTO {
  id: number;
  name: string;
}

// Nếu cần định nghĩa chung response:
interface PaginatedApiResponse<T> {
  status: number;
  error: any;
  message: string;
  data: {
    content: T;
    [key: string]: any;
  };
}

export const addressApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Provinces
    getProvinces: builder.query<LocationDTO[], void>({
      query: () => ({
        url: API_ROUTES.ADDRESS.PROVINCES,
        method: "GET",
      }),
      transformResponse: (response: PaginatedApiResponse<LocationDTO[]>) =>
        response.data.content,
    }),

    // Districts
    getDistricts: builder.query<LocationDTO[], number>({
      query: (provinceId) => ({
        url: `${API_ROUTES.ADDRESS.DISTRICTS}?provinceId=${provinceId}`,
        method: "GET",
      }),
      transformResponse: (response: PaginatedApiResponse<LocationDTO[]>) =>
        response.data.content,
    }),

    // Wards
    getWards: builder.query<LocationDTO[], number>({
      query: (districtId) => ({
        url: `${API_ROUTES.ADDRESS.WARDS}?districtId=${districtId}`,
        method: "GET",
      }),
      transformResponse: (response: PaginatedApiResponse<LocationDTO[]>) =>
        response.data.content,
    }),
  }),
});

export const { useGetProvincesQuery, useGetDistrictsQuery, useGetWardsQuery } =
  addressApi;
