//담당 : 이승현

import { Router } from "express";
import { messageService } from "../service/messageService.js";

const router = Router();

router.get("/", async (req, res) => {
  const user_id = req.user._id;
  const result = await messageService.getMessage(user_id);
  res.status(200).json({ result });
});

router.post("/", async (req, res) => {
  const user_id = req.user._id;
  const { target_id, title, description } = req.body;
  const result = await messageService.sendMessage(
    user_id,
    target_id,
    title,
    description
  );
  res.status(200).json({ result });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await messageService.deleteMessage(id);
  res.status(200).json({ result });
});

export default router;
