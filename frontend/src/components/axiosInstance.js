import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  withCredentials: true, // to send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
