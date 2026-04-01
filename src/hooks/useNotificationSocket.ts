"use client";

import { useEffect } from "react";
import socketIOClient from "socket.io-client";

/* 🔐 Safe derived socket type */
type SocketInstance = ReturnType<typeof socketIOClient>;

let socket: SocketInstance | null = null;

export function useNotificationSocket(
  onNotification?: () => void
) {
  useEffect(() => {
    if (socket) return;

    socket = socketIOClient("https://api.dolrise.com", {
      path: "/socket.io",
      transports: ["websocket"], // 👈 enough for auth cookies
    });

    socket.on("connect", () => {
      console.log("🔌 Notification socket connected");
    });

    socket.on("notification:new", () => {
      console.log("🔔 New notification received");
      onNotification?.();
    });

    socket.on("disconnect", () => {
      console.log("🔌 Notification socket disconnected");
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [onNotification]);
}
