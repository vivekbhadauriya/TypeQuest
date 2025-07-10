import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();
const router = Router();

// Purchase/Unlock
router.post("/", async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  // TODO: Implement payment processing and unlock logic
  // For now, just mark user as unlocked
  await prisma.user.update({
    where: { id: req.user.userId },
    data: { hasUnlock: true },
  });
  await prisma.purchase.create({
    data: {
      userId: req.user.userId,
      amount: 9,
      type: "UNLOCK",
    },
  });
  res.json({ message: "Multiplayer unlocked" });
});

export default router; 