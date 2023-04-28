//담당 : 이승현

import { Router } from "express";
const router = Router();

router.get("/education", async (req, res) => {
  const data = [
    {
      _id: 1,
      name: "test school1",
      major: "test major1",
      graduation: "test graduation1",
    },
    {
      _id: 2,
      name: "test school2",
      major: "test major2",
      graduation: "test graduation2",
    },
    {
      _id: 3,
      name: "test school3",
      major: "test major3",
    },
    {
      _id: 4,
      name: "test school4",
      major: "test major4",
      graduation: "test graduation4",
    },
    {
      _id: 5,
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
      _id: 1,
      name: "test award1",
      date: "test date1",
    },
    {
      _id: 2,
      name: "test award2",
      date: "test date2",
    },
    {
      _id: 3,
      name: "test award3",
      date: "test date3",
    },
    {
      _id: 4,
      name: "test award4",
      date: "test date4",
    },
    {
      _id: 5,
      name: "test award5",
      date: "test date5",
    },
  ];
  res.json(data);
});

router.get("/project", async (req, res) => {
  const data = [
    {
      _id: 1,
      name: "test project1",
      description: "test description1",
      date: "test date1",
      techStack: "test Stack1",
      refLink: "test link1",
    },
    {
      _id: 2,
      name: "test project2",
      date: "test date2",
      techStack: "test Stack2",
      refLink: "test link2",
    },
    {
      _id: 3,
      name: "test project3",
      description: "test description3",
      date: "test date3",
      techStack: "test Stack3",
    },
    {
      _id: 4,
      name: "test project4",
      date: "test date4",
      techStack: "test Stack4",
    },
    {
      _id: 5,
      name: "test project5",
      description: "test description5",
      date: "test date5",
      techStack: "test Stack5",
      refLink: "test link5",
    },
  ];
  res.json(data);
});

router.get("/certificate", async (req, res) => {
  const data = [
    {
      _id: 1,
      name: "test certificate1",
      date: "test date1",
      agency: "test agency1",
    },
    {
      _id: 2,
      name: "test certificate2",
      date: "test date2",
      agency: "test agency2",
    },
    {
      _id: 3,
      name: "test certificate3",
      date: "test date3",
      agency: "test agency3",
    },
    {
      _id: 4,
      name: "test certificate4",
      date: "test date4",
      agency: "test agency4",
    },
    {
      _id: 5,
      name: "test certificate5",
      date: "test date5",
      agency: "test agency5",
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

router.put("/test-education", (req, res) => {
  console.log("put 입니다");
  console.log(req.body);
  res.send(true);
});

router.put("/test-project", (req, res) => {
  console.log("put 입니다");
  console.log(req.body);
  res.send(true);
});

router.put("/test-award", (req, res) => {
  console.log("put 입니다");
  console.log(req.body);
  res.send(true);
});

router.put("/test-certificate", (req, res) => {
  console.log("put 입니다");
  console.log(req.body);
  res.send(true);
});

router.patch("/test-education", (req, res) => {
  console.log("patch 입니다");
  console.log(req.body);
  res.send(true);
});

router.patch("/test-project", (req, res) => {
  console.log("patch 입니다");
  console.log(req.body);
  res.send(true);
});

router.patch("/test-award", (req, res) => {
  console.log("patch 입니다");
  console.log(req.body);
  res.send(true);
});

router.patch("/test-certificate", (req, res) => {
  console.log("patch 입니다");
  console.log(req.body);
  res.send(true);
});

router.delete("/test-education/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log("삭제 입니다");
  res.send(true);
});

router.delete("/test-project/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log("삭제 입니다");
  res.send(true);
});

router.delete("/test-award/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log("삭제 입니다");
  res.send(true);
});

router.delete("/test-certificate/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log("삭제 입니다");
  res.send(true);
});

export default router;
