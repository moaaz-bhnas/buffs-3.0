import { io } from "socket.io-client";

export default function initializeSocketIo() {
  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
    rejectUnauthorized: process.env.NODE_ENV === "production",
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return socket;
}
