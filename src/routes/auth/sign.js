//담당 : 이승현

import { Router } from "express";
import checkDuplicate from "../../middlewares/checkDuplicate.js";
import { createUser, deleteUser } from "./../../service/auth/sign.js";

const router = Router();

router.post("/signup", checkDuplicate, async (req, res) => {
  const { email, password, name } = req.body;
  const token = await createUser(email, password, name);
  res.json({ token });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteUser(id);
  res.send(result);
});

export default router;
