import axios, { AxiosInstance } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//interceptor to check for and append token
apiInstance.interceptors.request.use(
  function (config) {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//interceptor to check for unautorization error
apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      deleteCookie("token");
      deleteCookie("role");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

