import { Router } from "express";
import { certificateService } from "../service/certificateService";

const certificateRouter = Router();

/** 해당 유저 학력 추가
    JWT 토큰을 받아오는 곳이 필요 */
certificateRouter.post(
  "/certificate/register",
  async function (req, res, next) {
    try {
      // 토큰
    } catch (error) {
      next(error);
    }
  }
);

// 해당 유저 학력 조회
certificateRouter.get("/certificate", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

// 해당 유저 학력 수정
certificateRouter.put("/certificate", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export default certificateRouter;
