//담당 : 이승현

import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  const data = [
    {
      id: 1,
      email: "test1@gmail.com",
      name: "test1",
      description: "test description1",
    },
    {
      id: 2,
      email: "test2@gmail.com",
      name: "test2",
      description: "test description2",
    },
    {
      id: 3,
      email: "test3@gmail.com",
      name: "test3",
    },
    {
      id: 4,
      email: "test4@gmail.com",
      name: "test4",
      description: "test description4",
    },
    {
      id: 5,
      email: "test5@gmail.com",
      name: "test5",
      description: "test description5",
    },
  ];
  res.json(data);
});

export default router;
