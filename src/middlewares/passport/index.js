//담당 : 이승현

import passport from "passport";
import localPassport from "./local.js";
import googleStrategy from "./google.js";
import kakaoStrategy from "./kakao.js";
import { UserModel } from "../../db/schemas/user.js";

export const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const result = await UserModel.findOne({ email });
      done(null, result);
    } catch (err) {
      done(err);
    }
  });

  passport.use(localPassport);
  passport.use(googleStrategy);
  passport.use(kakaoStrategy);

  return passport;
};
