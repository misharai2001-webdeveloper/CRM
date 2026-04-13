import axios from "./axios";

const API = "http://localhost:5000/api/dashboard";

export const getDashboardStats = async () => {
  const res = await axios.get(`${API}/stats`);
  return res.data;
};

export const getSalesGraph = async () => {
  const res = await axios.get(`${API}/sales-graph`);
  return res.data;
};

export const getRecentActivity = async () => {
  const res = await axios.get(`${API}/recent-activity`);
  return res.data;
};

export const getActiveSales = async () => {
  const res = await axios.get(`${API}/active-sales`);
  return res.data;
};