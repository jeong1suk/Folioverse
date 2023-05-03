import { FollowModel } from "../schemas/follow.js";
import { UserModel } from "../schemas/user.js";

class Follow {
  static async create({ newFollow }) {
    const createdNewFollow = await FollowModel.create(newFollow);
    return createdNewFollow;
  }

  static async delete(_id) {
    const deletedFollow = await FollowModel.deleteOne(_id);
    return deletedFollow;
  }

  static async findAll() {
    const follows = await FollowModel.find({});
    return follows;
  }

  static async findByOne({ user_id, target_user }) {
    const findFollow = await FollowModel.findOne({ user_id, target_user });
    return findFollow;
  }

  static async saveAndPush({ user_id, target_user }) {
    const createFollow = new FollowModel({
      user_id: user_id,
      target_user: target_user._id,
    });
    await createFollow.save();

    target_user.follower_user.push(user_id);
    await target_user.save();
    return target_user.follower_user.length;
  }

  static async deleteAndPull({ id, target_user, user_id }) {
    await FollowModel.deleteOne({ _id: id });
    await UserModel.updateOne(
      { _id: target_user._id },
      { $pull: { follower_user: user_id } }
    );

    const updatedTargetUser = await UserModel.findById(target_user._id);
    return updatedTargetUser.follower_user.length;
  }
}

export { Follow };
