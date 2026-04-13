import axios from "axios";

const API = "http://localhost:5000/api/leads";

export const updateLeadStatus = async (id, payload) => {
  const res = await axios.put(`${API}/${id}`, payload);
  return res.data;
};
export const updateScheduleDate = (id, scheduledDate) =>
  axios.put(`${API}/schedule/${id}`, { scheduledDate }, { withCredentials: true });