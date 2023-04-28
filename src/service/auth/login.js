//담당 : 이승현

import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginAuthenticate = (req, res, next) => {
  return passport.authenticate(
    "local",
    { session: false },
    (err, user, info) => {
      if (!user) {
        return res.status(400).json({ message: info.message });
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        const { _id, email } = req.user;
        const payload = { _id, email };
        req.user.token = signJWT(payload);
        next();
      });
    }
  )(req, res, next);
};

export const signJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
};
