//담당 : 이승현

import { Router } from "express";
const router = Router();

import networkRouter from "./network.js";
import authRouter from "./auth.js";
import mvpRouter from "./mvp.js";

router.use("/network", networkRouter);
router.use("/auth", authRouter);
router.use("/mvp", mvpRouter);

export default router;
