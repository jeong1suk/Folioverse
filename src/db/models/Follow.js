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

  static async findByOne(_id, target_user) {
    const findFollow = await FollowModel.findOne( _id, target_user );
    return findFollow;
  }

  static async saveAndpush(_id, target_user) {
    const createFollow = new FollowModel({
      user_id: _id,
      target_user: target_user._id,
    });
    await createFollow.save();

    target_user.followers.push(createFollow._id);
    await target_user.save();
    return target_user.followers.length;
  }

  static async deleteAndpull(id, target_user) {
    const deleteFollow = await FollowModel.deleteOne({ _id: id });
    target_user.followers.pull(user._id);
    await target_user.save();
    return target_user.followers.length;
  }
}

export { Follow };
