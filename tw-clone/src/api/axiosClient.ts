import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  // エンドポイントの共通URL
  baseURL: BASE_URL,
});

// APIアクセス前の処理
axiosClient.interceptors.request.use(async (config: any) => {
  const token = await getToken();

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
