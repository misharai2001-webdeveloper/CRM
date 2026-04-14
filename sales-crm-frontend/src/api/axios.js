import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://crm-q3ca.onrender.com/api", 
});

export default axiosInstance;