import { UserModel } from "../db/schemas/user.js";

export const upVisit = async (id) => {
  const { visit_count } = await UserModel.findById({ _id: id });
  await UserModel.updateOne({ _id: id }, { visit_count: visit_count + 1 });
};
