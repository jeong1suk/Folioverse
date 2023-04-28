import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { projectService } from "../service/projectService.js";

const projectRouter = Router();

/** 해당 유저 project 추가 */
projectRouter.post("/register", async function (req, res, next) {
  try {
    // 토큰에서 받아올 수 있게 수정
    const user_id = req.user["user_id"];

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const date = req.body.date;
    const division = req.body.division;
    const description = req.body.description;
    const tech_stack = req.body.tech_stack;
    const link = req.body.link;

    // id는 유니크 값 부여
    const id = uuidv4();

    const data = { name, date, division, description, tech_stack, link };
    const newProject = await projectService.addProject({ id, user_id, data });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// 해당 유저 project 조회(전체)
projectRouter.get("/list", async function (req, res, next) {
  try {
    const user_id = req.user["user_id"];
    const project = await projectService.getUserprojectInfo({
      user_id,
    });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

// 해당 project 조회
projectRouter.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const project = await projectService.getprojectInfo({
      _id,
    });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
});

// 해당 project 수정
projectRouter.put("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const date = req.body.date ?? null;
    const name = req.body.name ?? null;
    const division = req.body.division ?? null;
    const description = req.body.description ?? null;
    const tech_stack = req.body.tech_stack ?? null;
    const link = req.body.link ?? null;

    const toUpname = { name, date, division, description, tech_stack, link };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const project = await projectService.upnameProject({
      _id,
      toUpname,
    });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

/** 해당 project 삭제 */
projectRouter.delete("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;

    const project = await projectService.deleteproject(_id);

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    // No content status 204
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default projectRouter;
