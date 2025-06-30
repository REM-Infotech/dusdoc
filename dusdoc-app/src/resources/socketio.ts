import { Manager } from "socket.io-client";

const baseUrl = new URL("/", import.meta.env.VITE_API_URL);

const manager = new Manager({
  host: baseUrl.hostname,
  port: baseUrl.port,
  secure: baseUrl.protocol === "https:",
  transports: ["websocket"],
  agent: true,
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    "Content-Type": "application/json",
  },
});

export default manager;
