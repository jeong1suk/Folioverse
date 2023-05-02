import bcrypt from "bcrypt";
import passport from "passport";
import { UserModel } from "../../db/schemas/user.js";
import { EducationModel } from "../../db/schemas/education.js";
import { ProjectModel } from "../../db/schemas/project.js";
import { AwardModel } from "../../db/schemas/award.js";
import { CertificateModel } from "../../db/schemas/certificate.js";
import { signJWT } from "./login.js";

const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({ email, password: hashedPassword, name });

  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        reject(err || info);
      } else {
        const { _id, email } = user;
        const payload = { _id, email };
        const token = signJWT(payload);
        resolve(token);
      }
    })({ body: { email, password } });
  });
};

const deleteUser = async (_id) => {
  const models = [EducationModel, ProjectModel, AwardModel, CertificateModel];
  await Promise.all(models.map((model) => model.deleteMany({ user_id: _id })));

  const user = await UserModel.deleteOne({ _id });
  return user.deletedCount ? true : false;
};

const checkDuplicate = async (email) => {
  const result = await UserModel.find({ email });
  return result.length > 0;
};

export { createUser, deleteUser, checkDuplicate };
