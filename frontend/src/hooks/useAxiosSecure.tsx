import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("user");
        logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
export default useAxiosSecure;
