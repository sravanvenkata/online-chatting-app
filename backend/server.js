const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin:"*",
  credentials:true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/auth", require("./routes/auth"));

const authMiddleware = require("./middleware/auth");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.userId });
});

app.use('/api/chat',require('./routes/chat'));

app.use("/api/message", require("./routes/message"));

app.use("/api/user", require("./routes/user"));

const Chat = require("./models/Chat");
const Message = require("./models/Message");

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"],
  },
});
app.set("io",io);

const jwt = require("jsonwebtoken");

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    console.log("User connected:", socket.userId);
  } catch {
    socket.disconnect();
    return;
  }

  socket.on("join-chat", async (chatId) => {
    try {
      const chat = await Chat.exists({
        _id: chatId,
        participants: socket.userId,
      });

      if (!chat) {
        return;
      }

      socket.join(chatId);
      console.log(`User ${socket.userId} joined chat ${chatId}`);
    } catch (err) {
      console.error("Join chat error:", err);
    }
  });

  socket.on("leave-chat", (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.userId} left chat ${chatId}`);
  });

  socket.on("send-message", async ({ chatId, text }) => {
    try {
      if (!chatId || !text?.trim()) {
        return;
      }

      const chat = await Chat.findOne({
        _id: chatId,
        participants: socket.userId,
      });

      if (!chat) {
        return;
      }

      const message = new Message({
        chatId,
        senderId: socket.userId,
        text: text.trim(),
      });

      await message.save();
      await Chat.findByIdAndUpdate(chatId, { lastMessage: text.trim() });

      const payload = message.toObject();
      payload._id = payload._id.toString();
      payload.chatId = payload.chatId.toString();
      payload.senderId = payload.senderId.toString();

      io.to(chatId).emit("new-message", payload);
    } catch (err) {
      console.error("Send message error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.userId);
  });
});



server.listen(5000, () => {
  console.log("Server running on port 5000");
});

