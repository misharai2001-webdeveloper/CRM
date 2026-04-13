import axios from "axios";

export default axios.create({
  baseURL: "https://crm-q3ca.onrender.com/api",
  withCredentials: true
});