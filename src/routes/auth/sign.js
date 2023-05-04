//담당 : 이승현

import { Router } from "express";
import checkToken from "./../../middlewares/checkToken.js";
import {
  createUser,
  deleteUser,
  checkDuplicate,
  findPassword,
} from "./../../service/auth/sign.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const isDuplicate = await checkDuplicate(email);

  if (isDuplicate) {
    res.status(409).json({ message: "이미 존재하는 이메일 입니다." });
  } else {
    const token = await createUser(email, password, name);
    res.json({ token });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  const result = await deleteUser(id);
  res.status(200).json({ result });
});

router.post("/find", async (req, res) => {
  const { email } = req.body;
  const result = await findPassword(email);
  res.json(result);
});

export default router;
