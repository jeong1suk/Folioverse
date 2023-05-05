//담당 : 이승현

import passport from "passport";
import bcrypt from "bcrypt";
import changeRandomPassword from "../../utils/changeRandomPassword.js";
import sendMailer from "../../utils/sendMailer.js";
import { UserModel } from "../../db/schemas/user.js";
import { EducationModel } from "../../db/schemas/education.js";
import { ProjectModel } from "../../db/schemas/project.js";
import { AwardModel } from "../../db/schemas/award.js";
import { CertificateModel } from "../../db/schemas/certificate.js";
import { DailyMetrics } from "../../db/models/DailyMetrics.js";
import { signJWT } from "./login.js";
import { CareerModel } from "../../db/schemas/career.js";
import { FollowModel } from "../../db/schemas/follow.js";
import { LikeModel } from "../../db/schemas/like.js";
import { MessageModel } from "../../db/schemas/message.js";
import { PostModel } from "../../db/schemas/post.js";
import { VisitorBookModel } from "../../db/schemas/visitorBook.js";
import { DailyMetricsModel } from "../../db/schemas/dailyMetrics.js";

const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name,
  });
  await DailyMetrics.createUserMetrics(user);
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
  const models = [
    EducationModel,
    ProjectModel,
    AwardModel,
    CertificateModel,
    CareerModel,
    FollowModel,
    LikeModel,
    PostModel,
    DailyMetricsModel,
  ];
  await Promise.all(models.map((model) => model.deleteMany({ user_id: _id })));
  await MessageModel.deleteMany({ sendUser: _id });
  await MessageModel.deleteMany({ targetUser: _id });
  await VisitorBookModel.deleteMany({ write_user: _id });
  await VisitorBookModel.deleteMany({ target_user: _id });
  await FollowModel.deleteMany({ target_user: _id });
  await LikeModel.deleteMany({ target_user: _id });
  await UserModel.updateMany(
    {},
    { $pull: { follower_user: _id, like_user: _id } }
  );

  const user = await UserModel.deleteOne({ _id });
  return user.deletedCount ? true : false;
};

const checkDuplicate = async (email) => {
  const result = await UserModel.find({ email });
  return result.length > 0;
};

const findPassword = async (email) => {
  const isExistEmail = await UserModel.findOne({ email });
  if (isExistEmail) {
    const { newPassword, hashedPassword } = await changeRandomPassword();
    await UserModel.updateOne({ email }, { password: hashedPassword });
    const result = await sendMailer(email, newPassword);
    return result;
  } else {
    return { message: "존재하지 않는 계정입니다" };
  }
};

export { createUser, deleteUser, checkDuplicate, findPassword };
