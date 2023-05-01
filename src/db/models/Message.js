//담당 : 이승현

import { MessageModel } from "../schemas/message.js";

class Message {
  static async send({ newMessage }) {
    const createdNewMessage = await MessageModel.create(newMessage);
    return createdNewMessage;
  }

  static async findById(_id) {
    const message = await MessageModel.findById(_id);
    return message;
  }

  static async findAllByUserId(user_id) {
    const message = await MessageModel.find({ targetUser: user_id });
    return message;
  }

  static async delete(_id) {
    const deletedMessage = await MessageModel.deleteOne({ _id });
    return deletedMessage;
  }
}

export { Message };
