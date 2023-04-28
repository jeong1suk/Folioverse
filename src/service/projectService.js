import { Project } from "../db/index.js";

const projectService = {
  addProject: async ({ id, user_id, data }) => {
    // 따로 확인할 조건이 없어보여 컬렉션 추가 코드만 작성
    const newProject = { id, user_id, ...data };
    const creatednewProject = await Project.create({ newProject });
    return creatednewProject;
  },

  getUserProjectInfo: async ({ user_id }) => {
    const projects = await Project.findOne({ user_id });

    if (!projects) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }

    return projects;
  },

  getProjectInfo: async ({ _id }) => {
    const project = await Project.findById({ _id });

    if (!project) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }

    return project;
  },

  updateProject: async ({ _id, toUpdate }) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let project = await Project.findById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }

    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.division) {
      const fieldToUpdate = "division ";
      const newValue = toUpdate.division;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.tech_stack) {
      const fieldToUpdate = "tech_stack";
      const newValue = toUpdate.tech_stack;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    if (toUpdate.link) {
      const fieldToUpdate = "link";
      const newValue = toUpdate.link;
      project = await Project.update({ _id, fieldToUpdate, newValue });
    }

    return Project;
  },

  deleteProject: async ({ _id }) => {
    const project = await Project.Model.findByIdAndDelete({ _id });

    return project;
  },
};

export { projectService };
