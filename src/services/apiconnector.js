import axios from "axios";

// Create axios instance with default settings
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  console.log("Axios Base URL:", process.env.REACT_APP_BASE_URL),
  withCredentials: true, // 👈 Important for cookies, JWT, etc.
});

// Generic API connector function
export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
