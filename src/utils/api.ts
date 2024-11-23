import axios, { AxiosInstance } from "axios";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS

console.log("SERVER_ADDRESS",SERVER_ADDRESS)

const api: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
