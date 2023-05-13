//담당 : 이승현

import { Strategy as KakaoStrategy } from "passport-kakao";
import { UserModel } from "../../db/schemas/user.js";
import { DailyMetrics } from "../../db/models/DailyMetrics.js";
import { kakaoConfig } from "../../lib/config.js";
import dotenv from "dotenv";
dotenv.config();

const kakaoStrategy = new KakaoStrategy(
  kakaoConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
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
      console.log(savedUser);
      await DailyMetrics.createUserMetrics(savedUser);

      done(null, savedUser);
    } catch (err) {
      done(err);
    }
  }
);

export default kakaoStrategy;
