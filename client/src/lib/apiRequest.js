import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8800/api", // ✅ Works everywhere
  withCredentials: true,
});

export default apiRequest;