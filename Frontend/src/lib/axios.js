import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
    try {
        const token = await window.Clerk?.session?.getToken();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("⚠️ No Clerk token found. User might not be logged in.");
        }
    } catch (error) {
        console.error("Error fetching Clerk token:", error);
    }
    return config;
});

export default axiosInstance;