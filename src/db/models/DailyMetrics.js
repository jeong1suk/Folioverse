import { DailyMetricsModel } from "../schemas/dailyMetrics.js";

class DailyMetrics {
  static async createUserMetrics(user) {
    const metrics = await DailyMetricsModel.create({ user_id: user._id });
    user.metrics.push(metrics._id);
    await user.save();
    return metrics;
  }

  static async upDateCount(user_id, condition, sign) {
    const metrics = await DailyMetricsModel.findOne({
      user_id,
      date: `${new Date().toISOString().substr(0, 10)}`,
    });

    // condition === follow, visit, like
    if (sign === "+") {
      metrics[`${condition}_count`] += 1;
    } else if (sign === "-") {
      metrics[`${condition}_count`] -= i;
    }
    metrics.save();
  }

  static async createWholeUsersMetrics(users) {
    try {
      users.forEach(async (user) => {
        // daily도 만들고, User에도 넣어줘야 하는데, 유저한텐 7일간의 정보만 들어가야 한다.
        const metrics = await DailyMetricsModel.create({
          user_id: user._id,
        });
        if (user.metrics.length >= 7) {
          user.metrics.shift();
        }
        user.metrics.push(metrics._id);
        await user.save();
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export { DailyMetrics };
