import io from "socket.io-client";

const socket = io("http://192.168.50.69:3000", {
  transports: ["websocket"],
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});
export default socket;
