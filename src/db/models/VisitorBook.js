//담당 : 이승현

import { VisitorBookModel } from "../schemas/visitorBook.js";

class VisitorBook {
  static async send({ newVisitorBook }) {
    const createdNewVisitorBook = await VisitorBookModel.create(newVisitorBook);
    return createdNewVisitorBook;
  }

  static async findById(_id) {
    const visitorbook = await VisitorBookModel.findById(_id);
    return visitorbook;
  }

  static async findAllByUserId(user_id) {
    const visitorbook = await VisitorBookModel.find({ target_user: user_id });
    return visitorbook;
  }

  static async delete(_id) {
    const deletedVisitorBook = await VisitorBookModel.deleteOne({ _id });
    return deletedVisitorBook;
  }
}

export { VisitorBook };
