import { AwardModel } from "../schemas/award.js";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findAll() {
    const award = await AwardModel.find({});
    return award;
  }

  static async findAllByUserId(user_id) {
    const award = await AwardModel.find(user_id);
    return award;
  }

  static async findById(_id) {
    const award = await AwardModel.findById(_id);
    return award;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async delete(_id) {
    const deletedAward = await AwardModel.deleteOne(_id);
    return deletedAward;
  }
}

export { Award };
