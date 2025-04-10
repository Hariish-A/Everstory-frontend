import { useQuery, useMutation, QueryClientConfig } from '@tanstack/react-query';
import axiosInstance from '../api/client';

export const useApiGet = (queryKey: any, url: string, config: QueryClientConfig) => {
  const [key, params] = queryKey;

  return useQuery({
    queryKey: [key, params],
    queryFn: () => axiosInstance.get(url, { params }),
    ...config,
  });
};

export const useApiPost = (url: string, config: QueryClientConfig) => {
  return useMutation({
    mutationFn: (data) => axiosInstance.post(url, data),
    ...config,
  });
};

export const useApiPut = (url: string, config: QueryClientConfig) => {
  return useMutation({
    mutationFn: (data) => axiosInstance.put(url, data),
    ...config,
  });
};

export const useApiDelete = (url: string, config: QueryClientConfig) => {
  return useMutation({
    mutationFn: () => axiosInstance.delete(url),
    ...config,
  });
};