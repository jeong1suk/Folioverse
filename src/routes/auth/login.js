//담당 : 이승현

import { Router } from "express";
import { loginAuthenticate } from "../../service/auth/login.js";
import dotenv from "dotenv";
import checkToken from "../../middlewares/checkToken.js";
dotenv.config();

const router = Router();

router.post(
  "/login-process",
  (req, res, next) => {
    loginAuthenticate(req, res, next);
  },
  async (req, res) => {
    const { token } = req.user;
    res.json({ token });
  }
);

router.get("/is-login", checkToken, (req, res) => {
  res.send(true);
});

router.get("/logout", (req, res, next) => {
  req.logout(() => res.send(true));
});

export default router;
