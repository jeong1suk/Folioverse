import { Router } from "express";
const router = Router();

import loginRouter from "./login.js";
import signRouter from "./sign.js";

router.get("/", (req, res) => res.send("Auth Page"));

router.use("/", loginRouter);
router.use("/", signRouter);

export default router;
