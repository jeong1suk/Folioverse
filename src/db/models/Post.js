import { PostModel } from "../schemas/post.js";

class Post {
  static async create({ newPost }) {
    const createdNewPost = await PostModel.create(newPost);
    return createdNewPost;
  }

  static async findAllByUserId(user_id) {
    const post = await PostModel.find({ user_id });
    return post;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPost;
  }

  static async delete(_id) {
    const deletedPost = await PostModel.deleteOne(_id);
    return deletedPost;
  }
}

export { Post };
