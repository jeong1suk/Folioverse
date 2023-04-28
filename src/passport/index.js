//담당 : 이승현

import passport from "passport";
import localPassport from "./local.js";
import { UserModel } from "../db/schemas/user.js";

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

  return passport;
};
