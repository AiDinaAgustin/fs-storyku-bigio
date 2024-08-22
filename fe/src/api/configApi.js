import axios from "axios";

const ConfigApi = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL,
});

export default ConfigApi;
