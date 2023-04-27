//담당 : 이승현

import { Router } from "express";
// import checkDuplicate from "../../middlewares/checkDuplicate.js";
import dotenv from "dotenv";
// import { createUser } from "../../service/auth/sign.js";
dotenv.config();

const router = Router();

// router.post("/signup", checkDuplicate, async (req, res, next) => {
//   const { email, password, name } = req.body;
//   const token = await createUser(email, password, name, next);
//   res.json({ token });
// });

export default router;
