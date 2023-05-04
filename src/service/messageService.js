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
        messageObj["sendUserName"] = sendUser.name;
        messageObj["sendUserProfileImage"] = sendUser.profile_image;
        return messageObj;
      })
    );
    return messagesWithNameAndProfileImage;
  },
  sendMessage: async (sendUser, targetUser, title, description) => {
    const newMessage = { sendUser, targetUser, title, description };
    const creatednewMessage = await Message.send({ newMessage });
    return creatednewMessage;
  },
  deleteMessage: async (_id) => {
    const deleteOneMessage = await Message.delete(_id);
    return deleteOneMessage;
  },
};

export { messageService };
