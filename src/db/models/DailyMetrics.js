import { DailyMetricsModel } from "../schemas/dailyMetrics.js";

class DailyMetrics {
  static async createUserMetrics(user) {
    const dailyMetrics = await DailyMetricsModel.create({ user_id: user._id });
    user.metrics.push(dailyMetrics._id);
    await user.save();
    return dailyMetrics;
  }

  static async createWholeUsersMetrics(users) {
    try {
      users.forEach(async (user) => {
        // daily도 만들고, User에도 넣어줘야 하는데, 유저한텐 7일간의 정보만 들어가야 한다.
        const dailyMetrics = await DailyMetricsModel.create({
          user_id: user._id,
        });
        if (user.metrics.length >= 7) {
          user.metrics.shift();
        }
        user.metrics.push(dailyMetrics._id);
        await user.save();
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export { DailyMetrics };
