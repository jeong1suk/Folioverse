import AWS from "aws-sdk";
import { sesConfig } from "../lib/config.js";

const AWS_SES = new AWS.SES(sesConfig);

const sendMailer = async (email, password) => {
  const params = {
    Source: "kcvoca2023@gmail.com",
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
        새로 발급된 임시비밀번호 : ' ${password} '
        로그인 후 비밀번호를 꼭 변경해주세요.
        `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Folioverse 에서의 새 비밀번호를 확인해 주세요`,
      },
    },
  };
  const result = await AWS_SES.sendEmail(params).promise();
  return result;
};

export default sendMailer;
