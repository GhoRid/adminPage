import axios from "axios";

export const instance = axios.create({
  baseURL: "http://111.91.190.109:80/imgapi/storeimg",
  timeout: 3000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
