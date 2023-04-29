import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

AWS.config.update({
  accessKeyId: "AKIA4DBADYT5MW2GWRUR",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const s3 = new AWS.S3();

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "elice-image-bucket",
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
