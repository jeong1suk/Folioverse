import { ProjectModel } from "../schemas/project.js";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findAll() {
    const project = await ProjectModel.find({});
    return project;
  }

  static async findAllByUserId(user_id) {
    const project = await ProjectModel.find(user_id);
    return project;
  }

  static async findById(_id) {
    const project = await ProjectModel.findById(_id);
    return project;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async delete(_id) {
    const deletedProject = await ProjectModel.deleteOne(_id);
    return deletedProject;
  }
}

export { Project };
