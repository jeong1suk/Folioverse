//담당 : 이승현

import { Router } from "express";
import { sendMessage } from "../service/messageService.js";

const router = Router();

router.post("/", async (req, res) => {
  const user_id = req.user._id;
  const { target_id, title, description } = req.body;
  const result = await sendMessage(user_id, target_id, title, description);
  res.status(200).json({ result });
});

export default router;
