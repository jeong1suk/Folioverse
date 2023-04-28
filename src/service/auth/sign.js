//담당 : 이승현

import bcrypt from "bcrypt";
import passport from "passport";
import { UserModel } from "../../db/schemas/user.js";
import { signJWT } from "./login.js";

export const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({
    email,
    password: hashedPassword,
    name,
  });

  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        reject(err || info);
      } else {
        const { email } = user;
        const payload = { email };
        const token = signJWT(payload);
        resolve(token);
      }
    })({ body: { email, password } });
  });
};
