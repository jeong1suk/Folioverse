//담당 : 이승현

import { Router } from "express";
import { getMessage, sendMessage } from "../service/messageService.js";

const router = Router();

router.get("/", async (req, res) => {
  const user_id = req.user._id;
  const result = await getMessage(user_id);
  res.status(200).json({ result });
});

router.post("/", async (req, res) => {
  const user_id = req.user._id;
  const { target_id, title, description } = req.body;
  const result = await sendMessage(user_id, target_id, title, description);
  res.status(200).json({ result });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
});

export default router;
