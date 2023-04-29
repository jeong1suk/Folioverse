import { Router } from "express";
import checkToken from "../../middlewares/checkToken.js";
import { checkPassword } from "../../service/auth/check.js";

const router = Router();

router.patch("/check-password", checkToken, async (req, res) => {
  const { password } = req.body;
  const result = await checkPassword(req.user._id, password);
  res.send(result);
});

export default router;
