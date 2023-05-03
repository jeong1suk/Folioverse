//담당 : 이승현

import { Router } from "express";
import { visitorBookService } from "../service/visitorBookService.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.get("/", checkToken, async (req, res) => {
  const { _id } = req.user;
  const result = await visitorBookService.getVisitorBook(_id);
  res.status(200).json({ result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await visitorBookService.getVisitorBook(id);
  res.status(200).json({ result });
});

router.post("/", checkToken, async (req, res) => {
  const write_user = req.user._id;
  const { target_user, description } = req.body;
  const result = await visitorBookService.sendVisitorBook(
    write_user,
    target_user,
    description
  );
  res.status(200).json({ result });
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  const result = await visitorBookService.deleteVisitorBook(id);
  res.status(200).json({ result });
});

export default router;
