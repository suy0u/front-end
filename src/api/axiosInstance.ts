import axios from "axios";
import { getEnv } from "../utils/env";

const env = getEnv();

const api = axios.create({
  baseURL: env.VITE_API_URL || "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
