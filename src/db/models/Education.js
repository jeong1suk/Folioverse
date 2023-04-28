import { EducationModel } from "../schemas/Education.js";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findAll() {
    const education = await EducationModel.find({});
    return education;
  }

  static async findAllByUserId(user_id) {
    const education = await EducationModel.find(user_id);
    return education;
  }

  static async findById(_id) {
    const education = await EducationModel.findById(_id);
    return education;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async delete(_id) {
    const deletedEducation = await EducationModel.deleteOne(_id);
    return deletedEducation;
  }
}

export { Education };
