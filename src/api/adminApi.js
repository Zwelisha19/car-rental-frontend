import axios from "axios";

const API_URL = "https://car-rental-backend-1-m022.onrender.com/api/admin";

export const adminLogin = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const getAdminDashboard = async (token) => {
  const res = await axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
