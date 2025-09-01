// src/sockets/socket.js
import { io } from "socket.io-client";

let socket = null;

// Use environment variable for backend socket server
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
console.log("Socket URL:", SOCKET_URL);

export const connectSocket = (token) => {
  if (!socket) {
    console.log("🛑 Initializing socket with token:", token);

    socket = io(SOCKET_URL, {
      withCredentials: true,
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected due to:", reason);
    });
  }
};

export const getSocket = () => socket;