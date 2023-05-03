import { LikeModel } from "../schemas/like.js";
import { UserModel } from "../schemas/user.js";

class Like {
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  static async delete(_id) {
    const deletedLike = await LikeModel.deleteOne(_id);
    return deletedLike;
  }

  static async findAll() {
    const likes = await LikeModel.find({});
    return likes;
  }

  static async findByOne({ user_id, target_user }) {
    const findlike = await LikeModel.findOne({ user_id, target_user });
    return findlike;
  }

  static async saveAndPush({ user_id, target_user }) {
    const createLike = new LikeModel({
      user_id: user_id,
      target_user: target_user._id,
    });
    await createLike.save();

    target_user.like_user.push(user_id);
    await target_user.save();
    return target_user.like_user.length;
  }

  static async deleteAndPull({id, target_user, user_id}) {
    await LikeModel.deleteOne({ _id: id });
    await UserModel.updateOne(
      { _id: target_user._id },
      { $pull: { like_user: user_id } }
    );

    const updatedTargetUser = await UserModel.findById(target_user._id);
    return updatedTargetUser.follower_user.length;
  }
}

export { Like };
