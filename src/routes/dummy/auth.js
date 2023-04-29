//담당 : 이승현

import { Router } from "express";
import multer from "multer";
const router = Router();

const upload = multer({ dest: "uploads/" });

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

router.post("/edit-profile", upload.single("image"), async (req, res) => {
  const { name, description } = req.body;
  console.log("Received fields:", name, description);
  console.log("Received file:", req.file);

  res.send(true);
});

export default router;
