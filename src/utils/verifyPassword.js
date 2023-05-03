//담당 : 이승현

import bcrypt from "bcrypt";

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
