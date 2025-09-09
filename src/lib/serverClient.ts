import axios from "axios";
import { MICROCMS_API_KEY, MICROCMS_BASE_URL } from "./config";

// Server-only Axios client: do not import in client components.
const serverClient = axios.create({
  baseURL: MICROCMS_BASE_URL,
  headers: {
    "X-API-KEY": MICROCMS_API_KEY,
  },
});

export default serverClient;

