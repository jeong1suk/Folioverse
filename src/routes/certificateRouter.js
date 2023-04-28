import { Router } from "express";
import { certificateService } from "../service/certificateService.js";

const certificateRouter = Router();

/** 해당 유저 certificate 추가 */
certificateRouter.put("/", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user._id;

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const date = req.body.date;
    const agency = req.body.agency;

    const newCertificate = await certificateService.addCertificate({
      user_id,
      data: { name, date, agency },
    });

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 certificate 조회(전체)
certificateRouter.get("/", async function (req, res, next) {
  try {
    const user_id = req.user._id;
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
certificateRouter.patch("/", async function (req, res, next) {
  try {
    const _id = req.body["_id"];
    // body data 로부터 업데이트할 사용자 정보를 추출함.

    const name = req.body.name ?? null;
    const date = req.body.date ?? null;
    const agency = req.body.agency ?? null;

    const toUpdate = { name, date, agency };

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
