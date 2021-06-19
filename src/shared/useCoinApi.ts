import axios, { AxiosResponse, Method } from "axios";
import React, { useEffect, useState } from "react";

type Setter<T> = (data: T) => void;

function useCoinApi<T>(
  method: Method,
  path: string
): [T | undefined, Setter<T>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    coinApi(method, path, setData);
  }, [method, path]);
  return [data, setData];
}

export function coinApi<T>(
  method: Method,
  path: string,
  callback: Setter<T>,
  data = {}
): void {
  const baseUrl = "https://api.coingecko.com/api/v3";

  axios({
    method,
    url: `${baseUrl}/${path}`,
    data,
  }).then((response: AxiosResponse<T>) => callback(response.data));
}

export default useCoinApi;
