import { Router } from "express";
import { educationService } from "../service/EducationService.js";

const educationRouter = Router();

/** 해당 유저 Education 추가 */
educationRouter.put("/", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user._id;

    // req (request) 에서 데이터 가져오기
    const school_name = req.body.school_name;
    const major = req.body.major;
    const graduate_status = req.body.graduate_status;

    const data = { school_name, major, graduate_status };
    const newEducation = await educationService.addEducation({ user_id, data });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 Education 조회(전체)
educationRouter.get("/", async function (req, res, next) {
  try {
    const user_id = req.user._id;
    const Education = await educationService.getUserEducationInfo({
      user_id,
    });

    if (Education.errorMessage) {
      throw new Error(Education.errorMessage);
    }

    res.status(200).send(Education);
  } catch (error) {
    next(error);
  }
});

// 해당 Education 조회
educationRouter.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const Education = await educationService.getEducationInfo({
      _id,
    });

    if (Education.errorMessage) {
      throw new Error(Education.errorMessage);
    }

    res.status(200).send(Education);
  } catch (error) {
    next(error);
  }
});

// 해당 Education 수정
educationRouter.patch("/", async function (req, res, next) {
  try {
    const _id = req.body["_id"];
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const school_name = req.body.school_name ?? null;
    const major = req.body.major ?? null;
    const graduate_status = req.body.graduate_status ?? null;

    const toUpdate = { school_name, major, graduate_status };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const education = await educationService.updateEducation({
      _id,
      toUpdate,
    });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

/** 해당 Education 삭제 */
educationRouter.delete("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;

    const education = await educationService.deleteEducation(_id);

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    // No content status 204
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default educationRouter;
