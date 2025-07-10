import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Create Room
router.post("/create", async (req, res) => {
  // TODO: Implement room creation
  res.json({ message: "Room created" });
});

// Join Room
router.post("/join", async (req, res) => {
  // TODO: Implement join room
  res.json({ message: "Joined room" });
});

// Leave Room
router.post("/leave", async (req, res) => {
  // TODO: Implement leave room
  res.json({ message: "Left room" });
});

// List Rooms
router.get("/list", async (req, res) => {
  // TODO: List available rooms
  res.json({ message: "Rooms listed" });
});

export default router; 