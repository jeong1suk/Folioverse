import { DailyMetrics, Follow } from "../db/index.js";
import { User } from "../db/index.js";

const FollowService = {
  //로그인한 유저인지, 아닌지 판별
  getFollow: async ({ userId, targetUserId }) => {
    // follow_user와 target_user가 모두 존재하는지 확인
    const user = await User.findById(userId);

    if (!user) {
      const errorMessage = "로그인이 필요한 서비스입니다.";
      return errorMessage;
    }
  },

  // 팔로우한 기록이 없는경우
  countUp: async ({ userId, targetUserId }) => {
    const user = await User.findById({ user_id: userId });
    const targetUser = await User.findById({ user_id: targetUserId });

    const follows = await Follow.findByOne({
      user_id: user._id,
      target_user: targetUser._id,
    });

    if (!follows) {
      const countfollow = await Follow.saveAndPush({
        user_id: user._id,
        target_user: targetUser,
      });
      // metrics 추가
      await DailyMetrics.countUp(targetUserId, "follow");
      return countfollow;
    }
  },

  // 이미 팔로우한 기록이 있는 경우
  countDown: async ({ userId, targetUserId }) => {
    const follows = await Follow.findByOne({
      user_id: userId,
      target_user: targetUserId,
    });
    const targetUser = await User.findById({ user_id: targetUserId });

    if (follows) {
      const deletefollow = await Follow.deleteAndPull(follows._id, targetUser);
      return deletefollow;
    }
  },
};

export { FollowService };
