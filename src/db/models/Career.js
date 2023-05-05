//담당 : 이승현

import { CareerModel } from "../schemas/career.js";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }

  static async findAll() {
    const career = await CareerModel.find({});
    return career;
  }

  static async findAllByUserId(user_id) {
    const career = await CareerModel.find(user_id);
    return career;
  }

  static async findById(_id) {
    const career = await CareerModel.findById(_id);
    return career;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCareer = await CareerModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCareer;
  }

  static async delete(_id) {
    const deletedCareer = await CareerModel.deleteOne(_id);
    return deletedCareer;
  }
}

export { Career };
