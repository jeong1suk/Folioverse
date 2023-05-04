//담당 : 이승현

import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const host = import.meta.env.VITE_SERVER_HOST;
const token = localStorage.getItem("token") ?? null;

const api = axios.create({
  baseURL: host,
  headers: {
    Authorization: token,
  },
});

export const useQueryGet = (link, key, queryOptions = {}) => {
  const queryFunc = async () => {
    const response = await api.get(link);
    return response.data;
  };

  return useQuery([key, host + link], queryFunc, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    ...queryOptions,
  });
};

export const useQueryPatch = (link, method, options = {}) => {
  const mutation = useMutation(async (req) => {
    const response = await api[method](link, req?.body, {
      headers: { ...options.headers },
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
  const mutation = useMutation(async (_id) => {
    const response = await api.delete(`${link}/${_id}`);
    return response.data;
  });

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    deleteMutate: mutation.mutate,
  };
};

export const useQueryGetRefetch = (link, key, queryOptions = {}) => {
  const [dataChanged, setDataChanged] = useState(false);
  const prevDataRef = useRef(null);

  const queryFunc = async () => {
    if (!token) return null;
    const response = await api.get(link);
    return response.data;
  };

  const { data, isLoading, error } = useQuery([key, host + link], queryFunc, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
    ...queryOptions,
    onSuccess: (newData) => {
      if (
        prevDataRef.current &&
        prevDataRef.current.result &&
        newData.result &&
        prevDataRef.current.result.length < newData.result.length
      ) {
        setDataChanged(true);
      } else {
        setDataChanged(false);
      }
      prevDataRef.current = newData;
    },
  });

  return { data, isLoading, error, dataChanged };
};
