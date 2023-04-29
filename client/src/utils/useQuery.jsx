import { useMutation, useQuery } from "react-query";
import axios from "axios";

const host = import.meta.env.VITE_SERVER_HOST;

export const useQueryGet = (link, key, queryOptions = {}) => {
  const token = localStorage.getItem("token") ?? null;
  const queryFunc = async () => {
    const response = await axios.get(host + link, {
      headers: { Authorization: token },
    });
    return response.data;
  };

  return useQuery([key, host + link], queryFunc, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    ...queryOptions,
  });
};

export const useQueryFetch = (link, method, options = {}) => {
  const token = localStorage.getItem("token") ?? null;
  const mutation = useMutation(async (req) => {
    const response = await axios[method](host + link, req?.body, {
      headers: { Authorization: token, ...options.headers },
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

export const useQueryDelete = (link) => {
  const token = localStorage.getItem("token") ?? null;
  const mutation = useMutation(async (body) => {
    const response = await axios.delete(host + link, {
      headers: { Authorization: token },
      body,
    });
    return response.data;
  });

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    deleteMutate: mutation.mutate,
  };
};
