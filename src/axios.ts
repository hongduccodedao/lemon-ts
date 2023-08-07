import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

instance.interceptors.request.use(
  function (config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  },
);

export default instance;
