import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}

// src/utils/apiConnector.js
// import axios from "axios";

// // Create axios instance with default settings
// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   withCredentials: true, // 👈 Important for cookies, JWT, etc.
// });

// // Generic API connector function
// export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
//   return axiosInstance({
//     method,
//     url,
//     data: bodyData,
//     headers,
//     params,
//   });
// };
