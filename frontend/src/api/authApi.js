import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: API_URL || "http://localhost:5000/api",
});

export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
