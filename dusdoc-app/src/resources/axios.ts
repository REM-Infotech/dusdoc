import axios from "axios";

const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "X-Xsrf-Token",
  xsrfHeaderName: "X-Xsrf-Token",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
