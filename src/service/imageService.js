//담당 : 이승현

import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3Config } from "../lib/config.js";

import dotenv from "dotenv";
dotenv.config();

AWS.config.update(s3Config);

const s3 = new AWS.S3();

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: "elice-image-bucket",
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
