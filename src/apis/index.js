import axios from "axios";

export const instance = axios.create({
  baseURL: "https://blueseat.site/imgapi/storeimg",
  timeout: 3000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
