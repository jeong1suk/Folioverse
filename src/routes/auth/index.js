import { Router } from "express";
const router = Router();

import loginRouter from "./login.js";
import signRouter from "./sign.js";

router.use("/", loginRouter);
router.use("/", signRouter);

export default router;
