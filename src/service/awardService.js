import { Award } from "../db/index.js";

const awardService = {
  addAward: async ({ user_id, data }) => {
    // 따로 확인할 조건이 없어보여 컬렉션 추가 코드만 작성
    const newAward = { user_id, ...data };
    const creatednewAward = await Award.create({ newAward });
    return creatednewAward;
  },

  getUserAwardInfo: async (user_id) => {
    const awards = await Award.findAllByUserId(user_id);
    if (!awards) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return awards;
  },

  getAwardInfo: async ({ _id }) => {
    const award = await Award.findById({ _id });
    if (!award) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return award;
  },

  updateAward: async ({ _id, toUpdate }) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let award = await Award.findById({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      award = await Award.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      award = await Award.update({ _id, fieldToUpdate, newValue });
    }
    return award;
  },

  deleteAward: async (_id) => {
    const award = await Award.delete({ _id });
    return award;
  },
};

export { awardService };
