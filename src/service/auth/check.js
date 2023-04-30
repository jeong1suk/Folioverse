//담당 : 이승현
import { verifyPassword } from "../../utils/verifyPassword.js";

export const checkPassword = async (user, password) => {
  return await verifyPassword(password, user.password);
};
