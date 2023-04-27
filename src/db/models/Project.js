import { ProjectModel } from "../schemas/user";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }  
  
  static async findAll() {
    const users = await ProjectModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    
    const updatedProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedProject;
    }

    static async delete({ user_id }) {
      const filter = { id: user_id };
      const deletedProject = await ProjectModel.deleteOne(filter);
      return deletedProject;
    }  
  }

export { Project };


  
