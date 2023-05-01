import { Message } from "../db/models/Message.js";

const getMessage = async (id) => {
  const message = await Message.findAllByUserId(id);
  return message;
};

const sendMessage = async (sendUser, targetUser, title, description) => {
  const newMessage = { sendUser, targetUser, title, description };
  const creatednewMessage = await Message.send({ newMessage });
  return creatednewMessage;
};

export { sendMessage, getMessage };
