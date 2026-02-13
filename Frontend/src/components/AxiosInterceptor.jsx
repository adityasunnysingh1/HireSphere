import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { axiosInstance } from "../lib/axios.js";

const AxiosInterceptor = ({ children }) => {
  const { getToken } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Setup the Interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        // 2. Grab the Token
        const token = await getToken();
        
        // 3. Attach it to the Headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    setIsReady(true);

    // 4. Cleanup when this component unmounts
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  // Wait for the interceptor to be ready before rendering the app
  return isReady ? children : null; 
};

export default AxiosInterceptor;