// src/services/socket.ts
import { io, Socket } from "socket.io-client";

const endpoint = process.env.EXPO_PUBLIC_ENDPONT_HOME;
if (!endpoint) {
  throw new Error("No endpoint found");
}
const SOCKET_URL: string = endpoint; // Remplacez par l'URL de votre backend

class SocketService {
  private socket: Socket | null = null;

  connect(userId: string) {
    this.socket = io(SOCKET_URL, {
      extraHeaders: {
        userId: userId,
      },
    });
    // set room id

    this.socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;
