import { LikeModel } from "../schemas/like.js";

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

  static async deleteAndPull(id, target_user) {
    // 이미 좋아요한 기록이 있는 경우
    const deleteLike = await Like.delete({ _id: id });
    target_user.like_user.pull(target_user._id);
    await target_user.save();
    return target_user.like_user.length;
  }
}

export { Like };
