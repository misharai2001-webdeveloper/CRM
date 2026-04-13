import axios from "axios";

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);   // 👈 field name MUST be "file"

  const res = await axios.post(
    "http://localhost:5000/api/upload",
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};