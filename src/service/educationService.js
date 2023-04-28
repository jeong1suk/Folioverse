import { Education } from "../db/index.js";

const educationService = {
  addEducation: async ({ user_id, data }) => {
    // 따로 확인할 조건이 없어보여 컬렉션 추가 코드만 작성
    const newEducation = { user_id, ...data };
    const creatednewEducation = await Education.create({ newEducation });
    return creatednewEducation;
  },

  getUserEducationInfo: async (user_id) => {
    const educations = await Education.findAllByUserId(user_id);
    if (!educations) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return educations;
  },

  getEducationInfo: async ({ _id }) => {
    const education = await Education.findById({ _id });
    if (!education) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return education;
  },

  updateEducation: async ({ _id, toUpdate }) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let education = await Education.findById({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    if (toUpdate.school_name) {
      const fieldToUpdate = "school_name";
      const newValue = toUpdate.school_name;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.graduate_status) {
      const fieldToUpdate = "graduate_status";
      const newValue = toUpdate.graduate_status;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }
    return education;
  },

  deleteEducation: async (_id) => {
    const education = await Education.delete({ _id });
    return education;
  },
};

export { educationService };
