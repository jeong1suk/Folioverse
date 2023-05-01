import { Message } from "../db/models/Message.js";
import { UserModel } from "../db/schemas/user.js";

const messageService = {};

const getMessage = async (id) => {
  const messages = await Message.findAllByUserId(id);
  const messagesWithName = await Promise.all(
    messages.map(async (message) => {
      const sendUser = await UserModel.findById(message.sendUser).select(
        "name"
      );
      const messageObj = message.toObject();
      messageObj["sendUserName"] = sendUser.name;
      return messageObj;
    })
  );
  return messagesWithName;
};

const sendMessage = async (sendUser, targetUser, title, description) => {
  const newMessage = { sendUser, targetUser, title, description };
  const creatednewMessage = await Message.send({ newMessage });
  return creatednewMessage;
};

const deleteMessage = async () => {};

export { sendMessage, getMessage };
