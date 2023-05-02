import { Router } from "express";
import { FollowService } from "../service/followService.js";


const followRouter = Router();

//요청경로는 어떻게 정하는거여...
followRouter.post('/:target_user_id', async (req, res) => {
  const userId = req.user._id;
  const targetUserId = req.params.target_user_id;

  try {
    const result = await FollowService.countLike({ userId, targetUserId });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default followRouter; 