import API from "./axios";

export const getAdminProfile = async () => {
  const res = await API.get("/settings/profile");
  return res.data;
};

export const updateAdminProfile = async (data) => {
  const res = await API.put("/settings/profile", data);
  return res.data;
};