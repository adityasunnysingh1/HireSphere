import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios.js";

const AxiosInterceptor = ({ children }) => {
  const { getToken } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          // 👇 This log will show in console if it works!
          console.log("🟢 Interceptor attached token:", token.slice(0, 10) + "...");
        } else {
          console.warn("🔴 No token found in Interceptor!");
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    setIsReady(true);

    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return isReady ? children : null;
};

export default AxiosInterceptor;