import { io } from "socket.io-client";

const socket = io("https://online-chatting-app-kafx.onrender.com", {
  autoConnect: false,
});

export default socket;
