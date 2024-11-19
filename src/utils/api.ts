import axios ,{AxiosInstance}from "axios";

const api:AxiosInstance = axios.create({
    baseURL:"http://localhost:5000/api",
});

export default api;