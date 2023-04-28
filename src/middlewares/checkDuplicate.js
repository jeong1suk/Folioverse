import { UserModel } from "../db/schemas/user.js";

const checkDuplicate = async (req, res, next) => {
  const { email } = req.body;
  const result = await UserModel.find({ email });
  if (result.length > 1) {
    res.status(409).json({ message: "이미 존재하는 이메일 입니다" });
    return;
  } else {
    next();
  }
};

export default checkDuplicate;
