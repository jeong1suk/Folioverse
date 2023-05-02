import { Follow } from "../db/index.js";
import { User } from "../db/index.js";

const FollowService = {

  countFollow: async ({ userId, targetUserId }) => {
    // like_user와 target_user가 모두 존재하는지 확인

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);


    if (!user || !targetUser) {
      throw new Error('로그인을 해주세요.');
    }

    // 좋아요 정보를 조회
    const likes = await Like.findByOne(user._id, targetUser._id);

    if (!likes) {
     Follow.saveAndpush(user._id, targetUser)
    } else {
      // 이미 좋아요한 기록이 있는 경우
      Follow.deleteAndpull(likes._id, targetUser)
    }
  }
};

export { FollowService };