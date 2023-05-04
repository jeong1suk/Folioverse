//담당 : 이승현

import { VisitorBook } from "../db/models/VisitorBook.js";
import { UserModel } from "../db/schemas/user.js";

const visitorBookService = {
  getVisitorBook: async (id) => {
    const visitorBooks = await VisitorBook.findAllByUserId(id);
    const visitorBooksWithNameAndProfileImage = await Promise.all(
      visitorBooks.map(async (visitorBook) => {
        const write_user = await UserModel.findById(
          visitorBook.write_user
        ).select("name profile_image");
        const visitorBookObj = visitorBook.toObject();
        visitorBookObj["write_userName"] = write_user.name;
        visitorBookObj["write_userProfileImage"] = write_user.profile_image;
        return visitorBookObj;
      })
    );
    return visitorBooksWithNameAndProfileImage;
  },
  sendVisitorBook: async (write_user, target_user, description) => {
    const newVisitorBook = { write_user, target_user, description };
    const creatednewVisitorBook = await VisitorBook.send({ newVisitorBook });
    return creatednewVisitorBook;
  },
  deleteVisitorBook: async (_id) => {
    const deleteOneVisitorBook = await VisitorBook.delete(_id);
    return deleteOneVisitorBook;
  },
};

export { visitorBookService };
