import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(token?: string): Socket {
  if (!socket) {
    socket = io("https://api.dolrise.com", {
      withCredentials: true,
      auth: {
        token,
      },
    });
  }
  return socket;
}
