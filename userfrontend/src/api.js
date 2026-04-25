import axios from "axios";

// Backend base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Backend'de session / cookie ayarları varsa admin paneliyle uyumlu olması için korunur
});

export default api;
