import axios from "axios";

// Client-side safe axios instance targeting our internal API proxy.
const client = axios.create({
  baseURL: "/api",
});

export default client;
