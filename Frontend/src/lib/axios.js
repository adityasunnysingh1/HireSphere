import axios from "axios";

// Debugging: This will print the variable to your browser console (F12)
console.log("🔍 DEBUG: Current VITE_API_URL is:", import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
	// TEMPORARY FIX: Hardcode the URL to force it to work
	baseURL: "https://vynterview-production.up.railway.app/api", 
	// baseURL: import.meta.env.VITE_API_URL, // We will uncomment this later
	withCredentials: true,
});

export default axiosInstance;