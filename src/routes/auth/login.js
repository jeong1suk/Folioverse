//담당 : 이승현

import { Router } from "express";
import { loginAuthenticate } from "../../service/auth/login.js";
import checkToken from "../../middlewares/checkToken.js";

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

export default router;
