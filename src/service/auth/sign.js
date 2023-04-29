//담당 : 이승현

import bcrypt from "bcrypt";
import passport from "passport";
import { UserModel } from "../../db/schemas/user.js";
import { signJWT } from "./login.js";

export const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name,
  });

  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        reject(err || info);
      } else {
        // user
        const { _id, email } = user;
        const payload = { _id, email };
        const token = signJWT(payload);
        resolve(token);
      }
    })({ body: { email, password } });
  });
};

export const deleteUser = async (_id) => {
  const user = await UserModel.deleteOne({ _id });
  return user;
};
