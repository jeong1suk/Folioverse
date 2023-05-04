import { DailyMetrics, Follow } from "../db/index.js";
import { User } from "../db/index.js";

const FollowService = {
  //로그인한 유저인지, 아닌지 판별
  getFollow: async ({ userId, targetUserId }) => {
    // follow_user와 target_user가 모두 존재하는지 확인
    const user = await User.findById({ user_id: targetUserId });

    const isFollowing = user.follower_user.some((followerId) =>
      followerId.equals(userId)
    );

    return isFollowing;
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
      await DailyMetrics.upDateCount(targetUserId, "follow", "+");
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
      const id = follows._id;
      const deletefollow = await Follow.deleteAndPull({
        id,
        target_user: targetUser,
        user_id: userId,
      });
      // metrics 제거
      await DailyMetrics.upDateCount(targetUserId, "follow", "-");
      return deletefollow;
    }
  },

  getAllFolowers: async (id) => {
    const followByMe = await Follow.findAllByMe(id);
    const followByThem = await Follow.findAllByThem(id);

    const followByMeUsers = await Promise.all(
      followByMe.map(async (follow) => {
        let target_user = follow.target_user;
        const targetUser = await User.findById({ user_id: target_user });
        return targetUser;
      })
    );

    // Fetch user_id information for each element in followByThem
    const followByThemUsers = await Promise.all(
      followByThem.map(async (follow) => {
        let user_id = follow.user_id;
        const user = await User.findById({ user_id });
        return user;
      })
    );

    return { followByMeUsers, followByThemUsers };
  },
};

export { FollowService };
