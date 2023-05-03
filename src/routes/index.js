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

import othersRouter from "../extra/others.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/image", checkToken, imageRouter);
router.use("/post", postRouter);
router.use("/others", othersRouter);
router.use("/message", checkToken, messageRouter);
router.use("/user", userRouter);
router.use("/project", checkToken, projectRouter);
router.use("/education", checkToken, educationRouter);
router.use("/certificate", checkToken, certificateRouter);
router.use("/award", checkToken, awardRouter);
router.use("/visitor_book", visitorBookRouter);
router.use("/like", checkToken, likeRouter);
router.use("/follow", checkToken, followRouter);
router.use("/career", checkToken, careerRouter);

export default router;