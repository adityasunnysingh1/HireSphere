import axios from "axios";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true, //browser will send the cookies automatically to the server
});

export default axiosInstance;