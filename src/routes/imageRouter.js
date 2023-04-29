//담당 : 이승현

import { Router } from "express";
import { upload } from "../service/imageService.js";

const router = Router();

router.patch("/", upload.single("image"), async (req, res) => {
  res.status(200).send({
    imageUrl: req.file.location,
  });
});

export default router;
