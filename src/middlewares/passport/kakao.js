import { Strategy as KakaoStrategy } from "passport-kakao";
import { UserModel } from "../../db/schemas/user.js";
import dotenv from "dotenv";
dotenv.config();

const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: "/api/auth/kakao/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile);
      const email = profile.id + "@kakao.email";

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new UserModel({
        email,
        name: profile._json.properties.nickname,
      });

      const savedUser = await newUser.save();
      done(null, savedUser);
    } catch (err) {
      done(err);
    }
  }
);

export default kakaoStrategy;
