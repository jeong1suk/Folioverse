import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useQueryGet = (link, key, queryOptions = {}) => {
  const queryFunc = async () => {
    const response = await axios.get(link);
    return response.data;
  };

  return useQuery([key, link], queryFunc, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    ...queryOptions,
  });
};

export const useQueryFetch = (link, method) => {
  const mutation = useMutation(async (req) => {
    const response = await axios[method](link, req.body);
    return response.data;
  });

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    mutate: mutation.mutate,
  };
};
