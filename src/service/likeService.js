import { Like } from "../db/index.js";
import { User, DailyMetrics } from "../db/index.js";

const LikeService = {
  //로그인한 유저인지, 아닌지 판별
  getLike: async ({ userId, targetUserId }) => {
    // follow_user와 target_user가 모두 존재하는지 확인
    const user = await User.findById({ user_id: targetUserId });

    const isLike = user.like_user.some((likeId) => likeId.equals(userId));

    return isLike;
  },

  // 좋아요한 기록이 없는경우
  countUp: async ({ userId, targetUserId }) => {
    const user = await User.findById({ user_id: userId });
    const targetUser = await User.findById({ user_id: targetUserId });

    const likes = await Like.findByOne({
      user_id: user._id,
      target_user: targetUser._id,
    });

    if (!likes) {
      const countlike = await Like.saveAndPush({
        user_id: user._id,
        target_user: targetUser,
      });
      // metrics 추가
      await DailyMetrics.countUp(targetUserId, "like");
      return countlike;
    }
  },

  // 이미 좋아요한 기록이 있는 경우
  countDown: async ({ userId, targetUserId }) => {
    const likes = await Like.findByOne({
      user_id: userId,
      target_user: targetUserId,
    });

    const targetUser = await User.findById({ user_id: targetUserId });

    if (likes) {
      const id = likes._id;
      const deletelike = await Like.deleteAndPull({
        id,
        target_user: targetUser,
        user_id: userId,
      });
      return deletelike;
    }
  },
};

export { LikeService };
