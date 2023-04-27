import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }  
  
  static async findAll() {
    const awards = await AwardModel.find({});
    return awards;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    
    const updatedAward = await AwardModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedAward;
    }

    static async delete({ award_id }) {
      const filter = { id: award_id };
      const deletedAward = await AwardModel.deleteOne(filter);
      return deletedAward;
    }  
  }

export { Award };
