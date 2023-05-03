import { FollowModel } from "../schemas/follow.js";

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

  static async deleteAndPull(id, target_user) {
    await FollowModel.deleteOne({ _id: id });
    target_user.follower_user.pull(target_user._id);
    await target_user.save();
    return target_user.follower_user.length;
  }
}

export { Follow };
