//담당 : 이승현

import { Message } from "../db/models/Message.js";
import { UserModel } from "../db/schemas/user.js";

const messageService = {
  getMessage: async (id) => {
    const messages = await Message.findAllByUserId(id);
    const messagesWithNameAndProfileImage = await Promise.all(
      messages.map(async (message) => {
        const sendUser = await UserModel.findById(message.sendUser).select(
          "name profile_image"
        );
        const messageObj = message.toObject();
        messageObj["sendUserName"] = sendUser?.name;
        messageObj["sendUserProfileImage"] = sendUser?.profile_image;
        return messageObj;
      })
    );
    return messagesWithNameAndProfileImage;
  },
  sendMessage: async (sendUser, targetUser, title, description) => {
    const newMessage = { sendUser, targetUser, title, description };
    const creatednewMessage = await Message.send({ newMessage });
    await UserModel.findByIdAndUpdate(targetUser, { $set: { isRead: false } });
    return creatednewMessage;
  },
  deleteMessage: async (_id) => {
    const deleteOneMessage = await Message.delete(_id);
    return deleteOneMessage;
  },
  readMessage: async (_id) => {
    const readMessage = await UserModel.findByIdAndUpdate(_id, {
      $set: { isRead: true },
    });
    return readMessage;
  },
  isRead: async (_id) => {
    const isReadMessage = await UserModel.findById({ _id });
    const result = isReadMessage.isRead;
    return result;
  },
};

export { messageService };
