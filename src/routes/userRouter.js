import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { userService } from "../service/userService.js";

const userRouter = Router();

/** 네트워크 클릭시 전체 유저 목록 가져오기 */
userRouter.get("/list", async function (req, res, next) {
  try {
    // 전체 유저 목록을 얻음
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

/** 현재 유저 확인, 발급받은 토큰이 남아있다면 JWT 토큰 유저 데이터를 받아와서 자동 로그인 하는데 사용 */
userRouter.get("/current", async function (req, res, next) {
  try {
    // DB에서 유저 데이터를 다 받아서 로그인과 똑같은데이터를 전송
    const userId = req.user["id"];
    const currentUserInfo = await userService.getUserInfo({
      userId,
    });
    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

/** 회원 정보 수정 */
userRouter.put("/:id", async function (req, res, next) {
  try {
    // URI로부터 유저 id를 추출함.
    const userId = req.params.id;
    // body data 로부터 업데이트할 유저 정보를 추출함.
    const name = req.body.name ?? null;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const description = req.body.description ?? null;
    const profileImage = req.body.profileImage ?? null;

    const toUpdate = { name, email, password, description, profileImage };

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

/** 유저 정보 조회 */
userRouter.get("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const currentUserInfo = await userService.getUserInfo({ userId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
