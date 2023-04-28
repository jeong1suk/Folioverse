//담당 : 이승현

import { Router } from "express";
const router = Router();

router.get("/education", async (req, res) => {
  const data = [
    {
      id: 1,
      name: "test school1",
      major: "test major1",
      graduation: "test graduation1",
    },
    {
      id: 2,
      name: "test school2",
      major: "test major2",
      graduation: "test graduation2",
    },
    {
      id: 3,
      name: "test school3",
      major: "test major3",
    },
    {
      id: 4,
      name: "test school4",
      major: "test major4",
      graduation: "test graduation4",
    },
    {
      id: 5,
      name: "test school5",
      major: "test major5",
      graduation: "test graduation5",
    },
  ];
  res.json(data);
});

router.get("/award", async (req, res) => {
  const data = [
    {
      id: 1,
      name: "test award1",
      description: "test description1",
    },
    {
      id: 2,
      name: "test award2",
      description: "test description2",
    },
    {
      id: 3,
      name: "test award3",
    },
    {
      id: 4,
      name: "test award4",
      description: "test description4",
    },
    {
      id: 5,
      name: "test award5",
      description: "test description5",
    },
  ];
  res.json(data);
});

router.get("/project", async (req, res) => {
  const data = [
    {
      id: 1,
      name: "test project1",
      description: "test description1",
      refLink: "test link1",
    },
    {
      id: 2,
      name: "test project2",
      refLink: "test link2",
    },
    {
      id: 3,
      name: "test project3",
      description: "test description3",
    },
    {
      id: 4,
      name: "test project4",
    },
    {
      id: 5,
      name: "test project5",
      description: "test description5",
      refLink: "test link5",
    },
  ];
  res.json(data);
});

router.get("/license", async (req, res) => {
  const data = [
    {
      id: 1,
      name: "test license1",
    },
    {
      id: 2,
      name: "test license2",
    },
    {
      id: 3,
      name: "test license3",
    },
    {
      id: 4,
      name: "test license4",
    },
    {
      id: 5,
      name: "test license5",
    },
  ];
  res.json(data);
});

router.get("/follow/:id", async (req, res) => {
  const { id } = req.params;
  const data = [
    {
      id: 1,
      email: "follow1@gmail.com",
      name: "follow1",
      description: "follow description1",
    },
    {
      id: 2,
      email: "follow2@gmail.com",
      name: "follow2",
      description: "follow description2",
    },
    {
      id: 3,
      email: "follow3@gmail.com",
      name: "follow3",
    },
    {
      id: 4,
      email: "follow4@gmail.com",
      name: "follow4",
      description: "follow description4",
    },
    {
      id: 5,
      email: "follow5@gmail.com",
      name: "follow5",
      description: "follow description5",
    },
  ];
  res.json(data);
});

router.get("/followed/:id", async (req, res) => {
  const { id } = req.params;
  const data = [
    {
      id: 1,
      email: "followed1@gmail.com",
      name: "followed1",
      description: "followed description1",
    },
    {
      id: 2,
      email: "followed2@gmail.com",
      name: "followed2",
      description: "followed description2",
    },
    {
      id: 3,
      email: "followed3@gmail.com",
      name: "followed3",
    },
    {
      id: 4,
      email: "followed4@gmail.com",
      name: "followed4",
      description: "followed description4",
    },
    {
      id: 5,
      email: "followed5@gmail.com",
      name: "followed5",
      description: "followed description5",
    },
  ];
  res.json(data);
});

export default router;
