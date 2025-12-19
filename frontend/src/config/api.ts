import axios, { Axios } from "axios";
import { getUrlApi } from "./apiUrl";

export const api: Axios = axios.create({
  baseURL: getUrlApi(),
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
