import axios from "axios";

const backend = () =>
  axios.create({
    baseURL: "http://localhost",
    // baseURL: import.meta.env.VITE_API_URL,
    // headers: { Authorization: `Bearer ${token}` },
  });

export default backend;
