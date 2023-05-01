import { Message } from "../db/models/Message.js";

const sendMessage = async (sendUser, targetUser, title, description) => {
  const newMessage = { sendUser, targetUser, title, description };
  const creatednewMessage = await Message.send({ newMessage });
  return creatednewMessage;
};

export { sendMessage };
