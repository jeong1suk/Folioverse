import dotenv from "dotenv";
dotenv.config();

export const awsConfig = {
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
};
