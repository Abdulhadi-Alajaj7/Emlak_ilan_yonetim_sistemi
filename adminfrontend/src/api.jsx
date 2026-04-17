import axios from "axios";
import { refreshToken, cikisYap } from "./redux/authSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let storeRef = null;


export const setStore = (store) => {
  storeRef = store;
};

// İSTEK GÖNDERMEDEN HEMEN ÖNCE
api.interceptors.request.use(
  async (config) => {
    if (storeRef) {
      const token = storeRef.getState().auth.token;
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Sunucudan gelen cevapları yakalayıp kontrol eden
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry && storeRef) {  // retry: tekrarlandimi diye kontrol ediyoruz 
      originalRequest._retry = true;
      try {
        const res = await storeRef.dispatch(refreshToken()).unwrap();
        api.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${res.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        storeRef.dispatch(cikisYap());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;