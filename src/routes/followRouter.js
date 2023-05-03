import { Router } from "express";
import { FollowService } from "../service/followService.js";

const followRouter = Router();

// 특정 사용자를 팔로우한 정보 조회
followRouter.get("/:target_user_id", async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;
  const result = await FollowService.getFollow({ userId, targetUserId });
  res.status(200).json({ result });
});

// 특정 사용자를 팔로우
followRouter.post("/:target_user_id", async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;

  try {
    const follows = await FollowService.countUp({ userId, targetUserId });

    res.status(200).json({ success: true, follows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 특정 사용자를 팔로우 취소
followRouter.delete("/:target_user_id", async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;

  try {
    const unfollows = await FollowService.countDown({ userId, targetUserId });
    res.status(200).json({ success: true, unfollows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default followRouter;
