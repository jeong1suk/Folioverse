//담당 : 이승현

import dotenv from "dotenv";
dotenv.config();

export const sesConfig = {
  accessKeyId: process.env.SES_ACCESSKEYID,
  secretAccessKey: process.env.SES_SECRETACCESSKEY,
  region: process.env.REGION,
};

export const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

export const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.REDIRECT_CALLBACK + "/google/callback",
};

export const kakaoConfig = {
  clientID: process.env.KAKAO_CLIENT_ID,
  callbackURL: process.env.REDIRECT_CALLBACK + "/kakao/callback",
};
