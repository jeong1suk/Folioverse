//담당 : 이승현

import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { UserModel } from "../../db/schemas/user.js";

const verifyCallback = async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false, { message: "존재하지 않는 계정입니다" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: "비밀번호를 확인해 주세요",
      });
    }
  } catch (err) {
    done(err);
  }
};

const localPassport = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  verifyCallback
);

export default localPassport;
