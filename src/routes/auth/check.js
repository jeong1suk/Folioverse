//담당 : 이승현

import { Router } from "express";
import checkToken from "../../middlewares/checkToken.js";
import { checkPassword } from "../../service/auth/check.js";
import { userService } from "../../service/userService.js";

const router = Router();

router.post("/check-password", checkToken, async (req, res) => {
  const { password } = req.body;
  const user = await userService.getUserInfo({ _id: req.user._id });
  const result = await checkPassword(user, password);
  res.send(result);
});

export default router;
