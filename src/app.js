//담당 : 이승현

import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { initializePassport } from "./middlewares/passport/index.js";
import dailyMetrics from "./metrics/dailyMetrics.js";
import cron from "node-cron";

const app = express();

app.use(cors());
app.use(express.json());

const passport = initializePassport();
app.use(passport.initialize());

app.get("/", (req, res) => res.send("Hello, Express"));
app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "내부 서버 오류",
    },
  });
});
app.get("/test/daily", async (req, res) => {
  await dailyMetrics();
  res.send("good test");
});

// 정각마다 dailyMetrics 모듈 실행
const job = cron.schedule("0 0 * * *", dailyMetrics);
job.start();

app.listen(3000, () => {
  console.log("3000번 포트에서 Express 서버 실행중");
});

