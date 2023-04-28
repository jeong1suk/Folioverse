import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { certificateService } from "../service/certificateService.js";

const certificateRouter = Router();

/** 해당 유저 certificate 추가 */
certificateRouter.post("/register", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user["user_id"];

    // req (request) 에서 데이터 가져오기
    const date = req.body.date;
    const agency = req.body.agency;

    // id는 유니크 값 부여
    const id = uuidv4();

    const newCertificate = await certificateService.addCertificate({
      id,
      user_id,
      date,
      agency,
    });

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 certificate 조회(전체)
certificateRouter.get("/list", async function (req, res, next) {
  try {
    const user_id = req.user["user_id"];
    const certificate = await certificateService.getUserCertificateInfo({
      user_id,
    });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(certificate);
  } catch (error) {
    next(error);
  }
});

// 해당 certificate 조회
certificateRouter.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const certificate = await certificateService.getCertificateInfo({
      _id,
    });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).send(certificate);
  } catch (error) {
    next(error);
  }
});

// 해당 certificate 수정
certificateRouter.put("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const date = req.body.date ?? null;
    const agency = req.body.agency ?? null;

    const toUpdate = { date, agency };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const certificate = await certificateService.updateCertificate({
      _id,
      toUpdate,
    });

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).json(certificate);
  } catch (error) {
    next(error);
  }
});

/** 해당 certificate 삭제 */
certificateRouter.delete("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;

    const certificate = await certificateService.deleteCertificate(_id);

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    // No content status 204
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default certificateRouter;
