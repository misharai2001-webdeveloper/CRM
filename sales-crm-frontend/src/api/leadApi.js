import API from "./axios";

export const getLeads = async (page = 1) => {
  const res = await API.get(`/leads?page=${page}`);
  return res.data;
};

export const uploadLeadsCSV = async (formData) => {
  const res = await API.post("/leads/upload", formData);
  return res.data;
};

export const assignLeads = async (data) => {
  const res = await API.post("/leads/assign", data);
  return res.data;
};