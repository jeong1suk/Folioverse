import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { educationService } from "../service/educationService.js";

const educationRouter = Router();

/** 해당 유저 education 추가 */
educationRouter.post("/register", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user["user_id"];

    // req (request) 에서 데이터 가져오기
    const school_name = req.body.school_name;
    const major = req.body.major;
    const graduate_status = req.body.graduate_status;

    // id는 유니크 값 부여
    const id = uuidv4();

    const newEducation = await educationService.addEducation({
      id,
      user_id,
      school_name,
      major,
      graduate_status,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 education 조회(전체)
educationRouter.get("/list", async function (req, res, next) {
  try {
    const user_id = req.user["user_id"];
    const education = await educationService.getUserEducationInfo({
      user_id,
    });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

// 해당 education 조회
educationRouter.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const education = await educationService.getEducationInfo({
      _id,
    });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

// 해당 education 수정
educationRouter.put("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const major = req.body.major ?? null;
    const school_name = req.body.school_name ?? null;
    const graduate_status = req.body.graduate_status ?? null;

    const toUpschool_name = { school_name, major, graduate_status };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const education = await educationService.upschool_nameEducation({
      _id,
      toUpschool_name,
    });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

/** 해당 education 삭제 */
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
