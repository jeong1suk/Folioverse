import { Router } from "express";
import { userService } from "../service/userService.js";
import checkToken from "../middlewares/checkToken.js";

const userRouter = Router();

/** 네트워크 클릭시 전체 유저 목록 가져오기 */
userRouter.get("/list", async function (req, res, next) {
  try {
    // 전체 유저 목록을 얻음
    const users = await userService.getUsers();
    const sortedUsers = users.sort((a, b) => {
      return a.follower_user.length - b.follower_user.length;
    });
    res.status(200).send(sortedUsers);
  } catch (error) {
    next(error);
  }
});

/** 현재 유저 확인, 발급받은 토큰이 남아있다면 JWT 토큰 유저 데이터를 받아와서 자동 로그인 하는데 사용 */
userRouter.get("/current", checkToken, async function (req, res, next) {
  try {
    // 토큰 이용해서 로그인한 유저의 id를 안 상태
    // DB에서 유저 데이터를 다 받아서 로그인과 똑같은데이터를 전송
    const _id = req.user._id;
    const currentUserInfo = await userService.getUserInfo({ _id });

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

/** 회원 정보 수정 */
userRouter.patch("/:id", checkToken, async function (req, res, next) {
  try {
    // URI로부터 유저 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 유저 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const description = req.body.description ?? null;
    const profile_image = req.body.profile_image ?? null;

    const toUpdate = { name, email, password, description, profile_image };

    // 해당 유저 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

/** 유저 정보 조회, 현재 로그인한 유저가 있는 경우 응답은 따로 있기 때문에
 *  다른 유저 정보를 조회하는 경우가 사용할 것 같음
 *  visit을 올려야하기 때문에 여기서 count 추가
 */
userRouter.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const currentUserInfo = await userService.getUserInfo({ _id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/metrics", async function (req, res, next) {
  try {
    const _id = req.user._id;
    const metricsInfo = await userService.getUserMetricsInfo({ _id });

    if (metricsInfo) {
      throw new Error(metricsInfo.errorMessage);
    }
    res.status(200).send(metricsInfo);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
