//담당 : 이승현

import { Router } from "express";
import { getMessage, sendMessage } from "../service/messageService.js";
import { userService } from "../service/userService.js";

const router = Router();

router.get("/", async (req, res) => {
  const user_id = req.user._id;
  const result = await getMessage(user_id);
  // const sendUser = [];
  // result.forEach((item) => {
  //   let user = item.sendUser;
  //   sendUser.push(userService.getUserInfo({ user }));
  // });
  // console.log(sendUser);
  res.status(200).json({ result });
});

router.post("/", async (req, res) => {
  const user_id = req.user._id;
  const { target_id, title, description } = req.body;
  const result = await sendMessage(user_id, target_id, title, description);
  res.status(200).json({ result });
});

export default router;
