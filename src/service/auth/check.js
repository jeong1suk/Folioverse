import { userService } from "../userService.js";
import bcrypt from "bcrypt";

export const checkPassword = async (_id, password) => {
  const user = await userService.getUserInfo({ _id });
  const result = await bcrypt.compare(password, user.password);
  return result;
};
