import { CareerModel } from "../schemas/career.js";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }

  static async findAll() {
    const careers = await CareerModel.find({});
    return careers;
  }

  static async update({ career_id, fieldToUpdate, newValue }) {
    const filter = { id: career_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCareer = await CareerModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCareer;
  }

  static async delete({ career_id }) {
    const filter = { id: career_id };
    const deletedCareer = await CareerModel.deleteOne(filter);
    return deletedCareer;
  }
}

export { Career };
