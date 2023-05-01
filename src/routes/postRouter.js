//담당 : 이승현

import { Router } from "express";
import { postService } from "../service/postService.js";

const router = Router();

router.get("/", async (req, res) => {
  const { _id } = req.user;
  const result = await postService.getAllPost(_id);
  res.status(200).json({ result });
});

router.put("/", async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  const result = await postService.uploadPost(_id, body);
  res.status(200).json({ result });
});

router.patch("/", async (req, res) => {
  const { _id } = req.body;
  const { body } = req;
  const result = await postService.updatePost(_id, body);
  res.status(200).json({ result });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await postService.deletePost(id);
  res.status(200).json({ result });
});

export default router;
