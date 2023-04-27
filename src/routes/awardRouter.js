import { Router } from "express";
import { awardService } from "../service/awardService";

const awardRouter = Router();

/** 해당 유저 수상 추가 */
awardRouter.post("/award/register", async function (req, res, next) {
  try {
    // 토큰
  } catch (error) {
    next(error);
  }
});

// 해당 유저 수상 조회
awardRouter.get("/award", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

// 해당 유저 수상 수정
awardRouter.put("/award", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export default awardRouter;
