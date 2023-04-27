//담당 : 이승현

import { Router } from "express";
const router = Router();

router.get("/islogin", async (req, res) => {
  const data = true;
  res.json(data);
});

router.get("/user_info", async (req, res) => {
  const data = {
    id: 1,
    name: "test",
    email: "test@gmail.com",
    description: "test description",
  };
  res.json(data);
});

export default router;
