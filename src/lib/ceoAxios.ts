import axios from "axios";
	
const ceoAxios = axios.create({
     baseURL: "https://api.dolrise.com",
  withCredentials: true,
});

/* ===============================
   REQUEST INTERCEPTOR
=============================== */
ceoAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("ceo_token");

      console.log("🚀 CEO TOKEN:", token);

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No CEO token found");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR
=============================== */
ceoAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API ERROR:", error?.response?.data);

    if (error.response?.status === 401) {
      console.warn("❌ CEO session invalid or expired");
    }

    return Promise.reject(error);
  }
);

export default ceoAxios;
