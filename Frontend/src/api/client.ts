import axios from "axios";

const API_BASE_URL = import.meta.env.MODE === "production" 
  ? "https://identity-reconciliation-zvcl.onrender.com/api" 
  : "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

{/*"https://identity-reconciliation-zvcl.onrender.com/api"*/}