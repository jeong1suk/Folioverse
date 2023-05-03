// Responsible: Seunghyun Lee

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../../db/schemas/user.js";
import dotenv from "dotenv";
dotenv.config();

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await UserModel.findOne({
        email: profile._json.email,
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new UserModel({
        email: profile._json.email,
        name: profile._json.name,
      });

      const savedUser = await newUser.save();
      done(null, savedUser);
    } catch (err) {
      done(err);
    }
  }
);

export default googleStrategy;
