import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useGetAxios = (link, key, queryOptions = {}) => {
  const queryFunc = async () => {
    const response = await axios.get(link);
    const { data } = response;
    return data;
  };

  return useQuery([key, link], queryFunc, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    ...queryOptions,
  });
};

export const usePostAxios = (link) => {
  const mutation = useMutation(async (req) => {
    const response = await axios.post(link, req.body, {
      ...req.responseType,
    });
    return response.data;
  });

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    mutate: mutation.mutate,
  };
};
