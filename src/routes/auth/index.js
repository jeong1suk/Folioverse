//담당 : 이승현

import { Router } from "express";
const router = Router();

import loginRouter from "./login.js";
import signRouter from "./sign.js";
import checkRouter from "./check.js";

router.use("/", loginRouter);
router.use("/", signRouter);
router.use("/", checkRouter);

export default router;
