//담당 : 이승현

import { Career } from "../db/index.js";

const careerService = {
  addCareer: async ({ user_id, ...data }) => {
    // 따로 확인할 조건이 없어보여 컬렉션 추가 코드만 작성
    const newCareer = { user_id, ...data };
    const creatednewCareer = await Career.create({ newCareer });
    return creatednewCareer;
  },

  getUserCareerInfo: async (user_id) => {
    const careers = await Career.findAllByUserId(user_id);
    if (!careers) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return careers;
  },

  getCareerInfo: async ({ _id }) => {
    const career = await Career.findById({ _id });
    if (!career) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return career;
  },

  updateCareer: async ({ _id, toUpdate }) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let career = await Career.findById({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!career) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    if (toUpdate.yearly) {
      const fieldToUpdate = "yearly";
      const newValue = toUpdate.yearly;
      career = await Career.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.job) {
      const fieldToUpdate = "job";
      const newValue = toUpdate.job;
      career = await Career.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.isWeb || !toUpdate.isWeb) {
      const fieldToUpdate = "isWeb";
      const newValue = toUpdate.isWeb;
      career = await Career.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.position || !toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      career = await Career.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.tech_stack || !toUpdate.tech_stack) {
      const fieldToUpdate = "tech_stack";
      const newValue = toUpdate.tech_stack;
      career = await Career.update({ _id, fieldToUpdate, newValue });
    }
    return career;
  },

  deleteCareer: async (_id) => {
    const career = await Career.delete({ _id });
    return career;
  },
};

export { careerService };
