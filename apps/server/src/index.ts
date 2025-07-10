import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import Redis from "ioredis"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import helmet from "helmet"
import { json } from "body-parser"
import { gameRoutes } from "./routes/game"
import { authRoutes } from "./routes/auth"
import { userRoutes } from "./routes/user"
import { authMiddleware } from "./middleware/auth"
import apiRouter from "./routes"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const httpServer = createServer(app)

// Initialize Socket.io with Redis adapter
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
})

// Initialize Redis
const redis = new Redis(process.env.REDIS_URL!)

// Initialize Prisma
const prisma = new PrismaClient()

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))
app.use(express.json())
app.use(helmet())
app.use(json())

// Routes
app.use('/api/game', gameRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use("/api", apiRouter)

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// Auth middleware for protected routes
app.use(authMiddleware)

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  // Join room
  socket.on("join-room", async (roomId: string) => {
    socket.join(roomId)
    console.log(`Client ${socket.id} joined room ${roomId}`)
  })

  // Leave room
  socket.on("leave-room", (roomId: string) => {
    socket.leave(roomId)
    console.log(`Client ${socket.id} left room ${roomId}`)
  })

  // Typing progress update
  socket.on("typing-progress", (data: { roomId: string; progress: number }) => {
    socket.to(data.roomId).emit("typing-progress", {
      userId: socket.id,
      progress: data.progress,
    })
  })

  // Disconnect handler
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

// Start server
const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 