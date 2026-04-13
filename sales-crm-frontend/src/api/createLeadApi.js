import axios from "axios";

export const createLead = async (leadData) => {
  const res = await axios.post(
    "http://localhost:5000/api/leads",
    leadData,
    { withCredentials: true }
  );
  return res.data;
};