import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:1139",
  timeout: 30_000,
});

export default httpClient;
