import { Router } from "express";
import authRouter from "./auth";
import gameRouter from "./game";
import roomRouter from "./room";
import purchaseRouter from "./purchase";

const router = Router();

router.use("/auth", authRouter);
router.use("/game", gameRouter);
router.use("/room", roomRouter);
router.use("/purchase", purchaseRouter);

export default router; 