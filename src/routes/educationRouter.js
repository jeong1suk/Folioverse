import { Router } from "express";
import { educationService } from "../service/educationService";

const educationRouter = Router();

/** 해당 유저 학력 추가 */
educationRouter.post("/education/register", async function (req, res, next) {
  try {
    // 토큰
  } catch (error) {
    next(error);
  }
});

/** 해당 유저 학력 조회 */
educationRouter.get("/education", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

/** 해당 유저 학력 수정 */
educationRouter.put("/education", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export default educationRouter;
