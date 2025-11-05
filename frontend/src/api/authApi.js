import axios from "axios";
import { API_URL } from "@env";
console.log(" FRONTEND USING API_URL:", API_URL);


const api = axios.create({
  baseURL: API_URL || "http://localhost:8000/api",
});

export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
