//담당 : 이승현

import bcrypt from "bcrypt";

const changeRandomPassword = async () => {
  const newPassword = Math.random().toString(36).substring(2, 12);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return { newPassword, hashedPassword };
};

export default changeRandomPassword;
