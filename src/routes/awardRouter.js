import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { awardService } from "../service/awardService.js";

const awardRouter = Router();

/** 해당 유저 award 추가 */
awardRouter.post("/register", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user["user_id"];

    // req (request) 에서 데이터 가져오기
    const date = req.body.date;
    const name = req.body.name;

    // id는 유니크 값 부여
    const id = uuidv4();

    const newAward = await awardService.addAward({
      id,
      user_id,
      date,
      name,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 award 조회(전체)
awardRouter.get("/list", async function (req, res, next) {
  try {
    const user_id = req.user["user_id"];
    const award = await awardService.getUserAwardInfo({
      user_id,
    });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

// 해당 award 조회
awardRouter.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const award = await awardService.getAwardInfo({
      _id,
    });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

// 해당 award 수정
awardRouter.put("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const date = req.body.date ?? null;

    const toUpdate = { date, name };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const award = await awardService.updateAward({
      _id,
      toUpdate,
    });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

/** 해당 award 삭제 */
awardRouter.delete("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;

    const award = await awardService.deleteAward(_id);

    // No content status 204
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default awardRouter;
