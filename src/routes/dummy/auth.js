//담당 : 이승현

import { Router } from "express";
const router = Router();

router.get("/islogin", async (req, res) => {
  const data = true;
  res.json(data);
});

router.get("/user-info", async (req, res) => {
  const data = {
    id: 1,
    name: "test",
    email: "test@gmail.com",
    description: "test description",
  };
  res.json(data);
});

router.post("/check-password", async (req, res) => {
  const { password } = req.body;
  const dummyPassword = "test1234";
  res.send(password === dummyPassword ? true : false);
});

router.post("/change-password", async (req, res) => {
  const { password } = req.body;
  res.json(password);
});

router.post("/edit-profile", async (req, res) => {
  const { name, description } = req.body;
  res.json({ name, description });
});

export default router;
