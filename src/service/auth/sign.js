import bcrypt from "bcrypt";
import passport from "passport";
// import User from "../../schemas/users.js";
import { signJWT } from "./login.js";

// export const createUser = async (email, password, name) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   await User.create({
//     email,
//     password: hashedPassword,
//     name,
//   });

//   return new Promise((resolve, reject) => {
//     passport.authenticate("local", { session: false }, (err, user, info) => {
//       if (err || !user) {
//         reject(err || info);
//       } else {
//         const { email } = user;
//         const payload = { email };
//         const token = signJWT(payload);
//         resolve(token);
//       }
//     })({ body: { email, password } });
//   });
// };
