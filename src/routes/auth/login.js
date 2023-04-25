import { Router } from "express";
// import asyncHandler from "../../middlewares/asyncHandler.js";
// import passport from "passport";
// import jwt from "jsonwebtoken";
// import isLogin from "../../middlewares/isLogin.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// router.post(
//   "/login_process",
//   (req, res, next) => {
//     passport.authenticate("local", { session: false }, (err, user, info) => {
//       if (!user) {
//         return res.status(400).json({ message: info.message });
//       }

//       req.logIn(user, { session: false }, (err) => {
//         if (err) {
//           return next(err);
//         }
//         next();
//       });
//     })(req, res, next);
//   },
//   asyncHandler(async (req, res) => {
//     const { email } = req.user;
//     const payload = { email };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });
//     res.json({ token });
//   })
// );

// router.get(
//   "/islogin",
//   isLogin,
//   asyncHandler(async (req, res) => {
//     res.send(req.user ? true : false);
//   })
// );

// router.get(
//   "/logout",
//   asyncHandler(async (req, res, next) => {
//     await req.logout(() => res.send(true));
//   })
// );

export default router;
