import { UserModel } from "../schemas/user.js";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };

//참고 코드

// const mongoose = require('mongoose'); // 몽구스를 쓸거다

// const UserSchema = require('./schemas/user'); // 이 스키마 쓸거다

// const User = mongoose.model('User', UserSchema);

// User.fgeerasdfsad = async (query, page, perPage) => {
// console.log(1)

//   const [total, posts] = await Promise.all([

//     Post.countDocuments(query),
//     Post
//       .find(query)
//       .sort({ createdAt : -1 })
//       .skip(perPage * (page - 1))
//       .limit(perPage)
//       .populate('author'),n
//   ]);

//   const totalPage = Math.ceil(total / perPage);

//   return [posts, totalPage];
// }

// exports.Post = Post;
// exports.User = mongoose.model('User', UserSchema);
