//담당 : 이승현

import { Post } from "../db/models/Post.js";

const postService = {
  getAllPost: async (user_id) => {
    const post = await Post.findAllByUserId(user_id);
    if (post.length < 1) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    return post;
  },

  uploadPost: async (user_id, data) => {
    const newPost = { user_id, ...data };
    const creatednewPost = await Post.create({ newPost });
    return creatednewPost;
  },

  updatePost: async (_id, toUpdate) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let post = await Post.findById({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!post) {
      const errorMessage = "작성하신 기록이 없습니다. 다시 한 번 확인해주세요.";
      return { errorMessage };
    }
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      post = await Post.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      post = await Post.update({ _id, fieldToUpdate, newValue });
    }
    return post;
  },

  deletePost: async (_id) => {
    const post = await Post.delete(_id);
    return post;
  },
};

export { postService };
