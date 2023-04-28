import { UserModel } from "../db/schemas/user.js";

<<<<<<< HEAD
const checkDuplicate = async (req, res, next) => {
  const { email } = req.body;
  const result = await UserModel.find({ email });
  if (result.length) {
    res.status(409).json({ message: "이미 존재하는 이메일 입니다" });
    return;
  } else {
    next();
  }
};
=======
// const checkDuplicate = async (req, res, next) => {
//   const { email } = req.body;
//   const result = await User.find({ email });
//   if (result.length > 1) {
//     res.status(409).json({ message: "이미 존재하는 이메일 입니다" });
//     return;
//   } else {
//     next();
//   }
// };
>>>>>>> 20307e5cd8ab5be69adca5e16b2b42490ec670ed

export default checkDuplicate;
