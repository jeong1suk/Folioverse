import { EducationModel } from "../schemas/education.js";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findAll() {
    const educaiton = await EducationModel.find({});
    return educaiton;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await Model.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete({ user_id }) {
    const filter = { id: user_id };
    const deletedEducation = await EducationModel.deleteOne(filter);
    return deletedEducation;
  }
}

export { Education };
