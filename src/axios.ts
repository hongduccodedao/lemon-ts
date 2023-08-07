import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
