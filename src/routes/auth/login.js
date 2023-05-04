//담당 : 이승현

import { Router } from "express";
import {
  googleAuthenticate,
  kakaoAuthenticate,
  loginAuthenticate,
  passportAuthenticate,
} from "../../service/auth/login.js";
import checkToken from "../../middlewares/checkToken.js";

import passport from "passport";

const router = Router();

router.post("/login-process", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginAuthenticate(email, password);
    req.user = user;
    res.json({ token });
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

router.get("/is-login", checkToken, (req, res) => {
  res.send(true);
});

router.get("/logout", (req, res, next) => {
  req.logout(() => res.send(true));
});

router.get("/google", passportAuthenticate("google", ["profile", "email"]));

router.get("/google/callback", async (req, res, next) => {
  try {
    const { user, token } = await googleAuthenticate(req, res, next);
    const appURL = "http://localhost:5173/authorized";
    res.redirect(`${appURL}?token=${token}`);
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

router.get("/kakao", passportAuthenticate("kakao"));

router.get("/kakao/callback", async (req, res, next) => {
  try {
    const { user, token } = await kakaoAuthenticate(req, res, next);
    const appURL = "http://localhost:5173/authorized";
    res.redirect(`${appURL}?token=${token}`);
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
});

export default router;
