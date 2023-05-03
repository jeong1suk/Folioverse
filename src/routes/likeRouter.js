import { Router } from "express";
import { LikeService } from "../service/likeService.js";

const likeRouter = Router();

// 특정 사용자를 좋아요한 정보 조회
likeRouter.get("/:target_user_id", async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;
  const result = await FollowService.getFollow({ userId, targetUserId });
  res.status(200).json({ result });
});

// 특정 사용자를 좋아요
likeRouter.post('/:target_user_id', async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;

  try {
    const likes = await LikeService.countUp({ userId, targetUserId });
    
    res.status(200).json({ success: true, likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 특정 사용자를 좋아요 취소
likeRouter.delete('/:target_user_id', async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;

  try {
    const unlikes = await LikeService.countDown({ userId, targetUserId });
    res.status(200).json({ success: true, unlikes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default likeRouter; 
