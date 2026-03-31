import axios from "axios";
import { handleError } from "./error-handler";

const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
