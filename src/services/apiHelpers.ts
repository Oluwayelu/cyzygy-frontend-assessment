import {
  // QueryKey,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiInstance } from "./axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponseError, ApiResponseSuccess, QueryMethod } from "@/types/api";

export const useReactQuery = <T>(key: string, path: string) => {
  return useQuery<
    AxiosResponse<ApiResponseSuccess<T>>,
    AxiosError<ApiResponseError>
  >({
    queryKey: [key],
    queryFn: () => apiInstance.get<ApiResponseSuccess<T>>(path),
    staleTime: 7 * 24 * 60 * 60 * 1000,
    retry: 1,
  });
};

export const useReactMutation = <T, U>(
  path: string,
  method: QueryMethod = "post"
): UseMutationResult<
  AxiosResponse<ApiResponseSuccess<T>>,
  AxiosError<ApiResponseError>,
  U
> => {
  return useMutation<
    AxiosResponse<ApiResponseSuccess<T>>,
    AxiosError<ApiResponseError>,
    U
  >({
    mutationFn: (data: U) => {
      return apiInstance[method]<ApiResponseSuccess<T>>(path, data);
    },
  });
};

export const useReactQueryData = <T>(key: string) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<AxiosResponse<ApiResponseSuccess<T>>>([
    key,
  ]);
  return data;
};

