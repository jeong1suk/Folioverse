import { Router } from "express";
import { projectService } from "../service/projectService";

const projectRouter = Router();

/** 해당 유저 프로젝트 추가 */
projectRouter.post("/project/register", async function (req, res, next) {
  try {
    // 토큰
  } catch (error) {
    next(error);
  }
});

// 해당 유저 프로젝트 조회
projectRouter.get("/project", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

// 해당 유저 프로젝트 수정
projectRouter.put("/project", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export default projectRouter;
