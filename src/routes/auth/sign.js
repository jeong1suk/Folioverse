//담당 : 이승현

import { Router } from "express";
import checkDuplicate from "../../middlewares/checkDuplicate.js";
import { createUser } from "./../../service/auth/sign.js";

const router = Router();

<<<<<<< HEAD
router.post("/signup", checkDuplicate, async (req, res, next) => {
  const { email, password, name } = req.body;
  const token = await createUser(email, password, name, next);
  res.json({ token });
});
=======
// router.post("/signup", checkDuplicate, async (req, res) => {
//   const { email, password, name } = req.body;
//   const token = await createUser(email, password, name);
//   res.json({ token });
// });
>>>>>>> 20307e5cd8ab5be69adca5e16b2b42490ec670ed

export default router;
