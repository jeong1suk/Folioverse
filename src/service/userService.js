import { UserModel } from "../db/schemas/user.js";
import bcrypt from "bcrypt";
// import { User } from "../db";

const userService = {
  /** 네트워크 창 클릭 요청 시 응답.
      전체 유저 정보를 DB에서 가져온다 */
  getUsers: async () => {
    const users = await UserModel.find({});
    return users;
  },

  /** 회원정보수정 요청 시 응답.
      유저 정보를 변경한다 */
  setUser: async ({ userId, toUpdate }) => {
    // 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await UserModel.findOne({ id: userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    // name, email, password, description, profileImage
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = bcrypt.hash(toUpdate.password, 10);
      user = await update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.profileImage) {
      const fieldToUpdate = "profileImage";
      const newValue = toUpdate.profileImage;
      user = await update({ userId, fieldToUpdate, newValue });
    }

    return user;
  },

  /** id로 유저 정보를 얻고 싶은 요청이 있을 시 응답.
      유저 정보를 리턴한다. */
  getUserInfo: async ({ userId }) => {
    const user = await UserModel.findOne({ id: userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  },
};

export { userService };
