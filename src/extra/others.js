//담당 : 이승현

import { Router } from "express";
import { educationService } from "../service/educationService.js";
import { projectService } from "../service/projectService.js";
import { awardService } from "../service/awardService.js";
import { certificateService } from "../service/certificateService.js";

const router = Router();

const getUserInfo = async (service, method, user_id) => {
  return await service[method]({ user_id });
};

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const services = [
    { service: educationService, method: "getUserEducationInfo" },
    { service: projectService, method: "getUserProjectInfo" },
    { service: awardService, method: "getUserAwardInfo" },
    { service: certificateService, method: "getUserCertificateInfo" },
  ];

  const [education, project, award, certificate] = await Promise.all(
    services.map(({ service, method }) => getUserInfo(service, method, id))
  );

  res.json({ education, project, award, certificate });
});

export default router;
