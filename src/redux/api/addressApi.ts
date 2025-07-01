import { rootApi } from "@redux/api/rootApi";
import { API_ROUTES } from "@service/apiRoutes";
import { ApiResponse } from "@utils/constants/types/response";

// DTO đúng
export interface LocationDTO {
  id: number;
  name: string;
}
export interface AddressDTO {
  id?: number;
  name: string;
  phone: string;
  addressDetail: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  isDefault?: boolean;
  type: "home" | "office" | "other";
  fullAddress?: string;

  coordinates?: { lat: number; lng: number };
}

// Nếu cần định nghĩa chung response:
interface PaginatedApiResponse<T> {
  status: number;
  error: string | null;
  message: string;
  data: {
    content: T;
    [key: string]: unknown;
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
    getAddresses: builder.query<AddressDTO[], void>({
      query: () => ({
        url: `${API_ROUTES.ADDRESS.ADDRESSES}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<AddressDTO[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ADDRESS" as const, id })),
              { type: "ADDRESS" as const, id: "LIST" },
            ]
          : [{ type: "ADDRESS" as const, id: "LIST" }],
    }),
    createAddress: builder.mutation<void, AddressDTO>({
      query: (address) => ({
        url: API_ROUTES.ADDRESS.ADDRESSES, // hoặc API_ROUTES.ADDRESS.DISTRICTS, v.v.
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["ADDRESS"],
    }),
    updateAddress: builder.mutation<void, AddressDTO>({
      query: (address) => ({
        url: `${API_ROUTES.ADDRESS.ADDRESSES}`, // hoặc API_ROUTES.ADDRESS.DISTRICTS, v.v.
        method: "PUT",
        body: address,
      }),
      invalidatesTags: ["ADDRESS"],
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetWardsQuery,
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
