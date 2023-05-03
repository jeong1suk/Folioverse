import { Router } from "express";
import { awardService } from "../service/awardService.js";

const awardRouter = Router();

/** 해당 유저 Award 추가 */
awardRouter.put("/", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user._id;

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const date = req.body.date;

    const newAward = await awardService.addAward({
      user_id,
      data: { name, date },
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 Award 조회(전체)
awardRouter.get("/", async function (req, res, next) {
  try {
    const user_id = req.user._id;
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

// 해당 Award 조회
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

// 해당 Award 수정
awardRouter.patch("/", async function (req, res, next) {
  try {
    const _id = req.body["_id"];
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const date = req.body.date ?? null;

    const toUpdate = { name, date };

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

/** 해당 Award 삭제 */
awardRouter.delete("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;

    const award = await awardService.deleteAward(_id);

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    // No content status 204
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default awardRouter;
