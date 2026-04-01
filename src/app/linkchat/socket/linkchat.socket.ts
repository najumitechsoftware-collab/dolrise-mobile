import io from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;

export function getLinkChatSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      transports: ["websocket"],
    });
  }
  return socket;
}

export function disconnectLinkChatSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
