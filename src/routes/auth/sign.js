import { Router } from "express";
// import User from "../../schemas/users.js";
// import asyncHandler from "../../middlewares/asyncHandler.js";
// import bcrypt from "bcrypt";
// import passport from "passport";
// import jwt from "jsonwebtoken";
// import checkDuplicate from "../../middlewares/checkDuplicate.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// router.post(
//   "/signup",
//   checkDuplicate,
//   asyncHandler(async (req, res, next) => {
//     const { email, password, name } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({
//       email,
//       password: hashedPassword,
//       name,
//     });
//     next();
//   }),
//   passport.authenticate("local", { session: false }),
//   asyncHandler(async (req, res) => {
//     const { email } = req.user;
//     const payload = { email };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });
//     res.json({ token });
//   })
// );

export default router;
