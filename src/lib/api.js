import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
export const api = axios.create({
  baseURL: `${BACKEND}/api`,
  timeout: 20000,
});
