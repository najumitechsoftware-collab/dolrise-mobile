import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("ceo_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-rotated-token"];
    if (newToken) {
      localStorage.setItem("ceo_token", newToken);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ceo_token");
      window.location.href = "/ceo/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
