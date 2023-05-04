//담당 : 이승현

import { Router } from "express";

import authRouter from "./auth/index.js";
import imageRouter from "./imageRouter.js";
import postRouter from "./postRouter.js";
import messageRouter from "./messageRouter.js";
import userRouter from "./userRouter.js";
import projectRouter from "./projectRouter.js";
import certificateRouter from "./certificateRouter.js";
import awardRouter from "./awardRouter.js";
import educationRouter from "./educationRouter.js";
import likeRouter from "./likeRouter.js";
import followRouter from "./followRouter.js";
import careerRouter from "./careerRouter.js";
import visitorBookRouter from "./visitorBookRouter.js";
import othersRouter from "./othersRouter.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

//퍼블릭
router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/others", othersRouter);
router.use("/user", userRouter);

//프라이빗
router.use("/project", checkToken, projectRouter);
router.use("/education", checkToken, educationRouter);
router.use("/certificate", checkToken, certificateRouter);
router.use("/award", checkToken, awardRouter);
router.use("/visitor_book", visitorBookRouter);
router.use("/like", checkToken, likeRouter);
router.use("/follow", checkToken, followRouter);
router.use("/career", checkToken, careerRouter);
router.use("/image", checkToken, imageRouter);
router.use("/message", checkToken, messageRouter);

export default router;
