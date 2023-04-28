import { Certificate } from "../db/index.js";

const certificateService = {
  addCertificate: async ({ user_id, data }) => {
    // 따로 확인할 조건이 없어보여 컬렉션 추가 코드만 작성
    const newCertificate = { user_id, ...data };
    const creatednewCertificate = await Certificate.create({ newCertificate });
    return creatednewCertificate;
  },

  getUserCertificateInfo: async (user_id) => {
    const certificates = await Certificate.findAllByUserId(user_id);
    if (!certificates) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return certificates;
  },

  getCertificateInfo: async ({ _id }) => {
    const certificate = await Certificate.findById({ _id });
    if (!certificate) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return certificate;
  },

  updateCertificate: async ({ _id, toUpdate }) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.agency) {
      const fieldToUpdate = "agency";
      const newValue = toUpdate.agency;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }
    return certificate;
  },

  deleteCertificate: async (_id) => {
    const certificate = await Certificate.delete({ _id });
    return certificate;
  },
};

export { certificateService };
