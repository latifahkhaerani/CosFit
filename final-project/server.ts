import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Ketika menggunakan middleware, `hostname` dan `port` harus disediakan di bawah
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("send_msg", async (payload) => {
      const { roomId, message } = payload;

      try {
        const res = await fetch(`http://${hostname}:${port}/api/chat/${roomId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        io.to(roomId).emit("receive_msg", data.message);
      } catch (error) {
        console.error("Gagal menyimpan atau mengirim pesan:", error);
        io.to(roomId).emit("receive_msg", payload);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error("HTTP Server Error:", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});