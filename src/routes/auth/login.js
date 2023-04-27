//담당 : 이승현

import { Router } from "express";
import { loginAuthenticate, signJWT } from "../../service/auth/login.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/login-process",
  (req, res, next) => {
    loginAuthenticate(req, res, next);
  },
  async (req, res) => {
    const payload = { email };
    const token = signJWT(payload);
    console.log(token);

    res.json({ token });
  }
);

router.get("/is-login", (req, res) => {
  res.send(req.user ? true : false);
});

router.get("/logout", (req, res, next) => {
  req.logout(() => res.send(true));
});

export default router;
