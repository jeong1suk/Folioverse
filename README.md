# Folioverse

포트폴리오 제작 웹 사이트

https://folioverse.duckdns.org/

## 컨텐츠 목록

1. [시작하기](#시작하기)
   - [필수요건](#필수요건)
   - [설치](#설치)
2. [사이트 이용 설명](#사이트-이용-설명)
3. [상세 기술 설명](#상세-기술-설명)
4. [프로젝트 참여](#프로젝트-참여)
5. [저작권](#저작권)
6. [연락 정보](#연락-정보)
7. [폴더 트리](#폴더-트리)

## 시작하기

로컬 복사본을 설치 및 실행하려면 다음과 같은 간단한 단계를 수행하세요.

### 필수요건

이 프로젝트를 수행하려면 Node.js 및 npm이 시스템에 설치되어 있어야 합니다. Node.js는 [here](https://nodejs.org/)에서 다운로드할 수 있으며 npm이 함께 제공됩니다.

### 설치

1. 저장소 Clone 혹은 Download Zip

2. 프로젝트 폴더로 이동

3. 프로젝트 폴더에서 npm install, 그리고 client 폴더에서 npm install을 각각 실행하여 종속성 설치.

4. 프로젝트의 루트 디렉터리에 .env 파일을 생성하고 환경 변수를 구성하세요. 다음 형식을 참조로 사용합니다

```ini
MONGODB_URL=본인 몽고디비 데이터베이스 엔드포인트
JWT_SECRET=JWT시크릿키
AWS_ACCESS_KEY_ID=AWS키-아이디(S3버킷용)
AWS_SECRET_ACCESS_KEY=AWS시크릿-키(S3버킷용)
GOOGLE_CLIENT_ID=구글OAUTH클라이언트아이디
GOOGLE_CLIENT_SECRET=구글OAUTH클라이언트비밀번호
KAKAO_CLIENT_ID=카카오로그인 클라이언트아이디
SES_ACCESSKEYID=AWS키-아이디(SES메일링용)
SES_SECRETACCESSKEY=AWS시크릿-키(SES메일링용)
REGION=AWS가용지역
CLIENT_HOST=클라이언트 호스트(ex: 개발 시에는 http://localhost:5173)
REDIRECT_CALLBACK=콜백용 URL(ex: 개발 시에는 /api/auth)
```

client 폴더 내에도 .env 파일을 생성하고 다음과 같이 작성합니다

```ini
VITE_SERVER_HOST = 서버측 호스트 (ex: 개발 시에는 http://localhost:3000/api)
```

5. npm run dev 시, localhost:3000에 백엔드 서버, localhost:5173에 클라이언트 서버가 동시에 실행됩니다.

## 사이트 이용 설명

- 로그아웃 상태 시, 홈페이지 및 네트워크 탭 이용 가능
- 다크모드 이용 가능
- 회원가입 혹은 소셜로그인을 통해 로그인하세요
- 마이페이지에서 각종 포트폴리오용 정보를 입력하세요
- 항목을 선택적으로 볼 수 있습니다
- 기록하고 싶은 내용을 게시글 작성을 통해 기록하고 공유해보세요
- 자신의 포트폴리오를 PDF로 다운로드 할 수 있습니다
- 다른사람의 페이지에서 팔로우,좋아요 가능
- 다른사람의 페이지에서 쪽지 및 방명록 작성 가능
- 회원설정 페이지에서 이름,설명,프로필 사진 수정 가능
- 회원설정 페이지에서 비밀번호 변경 및 회원탈퇴 가능
- 회원설정 페이지에서 나를 팔로우한 유저와 내가 팔로우한 유저 확인 및 방문 가능
- 회원설정 페이지에서 방문자수,팔로워수,좋아요수에 대한 지난1주일 통계 확인 가능
- 네트워크 페이지에서 기본적으로 팔로워수가 많은 순으로 다른 사람들의 프로필 열람 가능
- 네트워크 페이지에서 각종 기준으로 필터링하여 프로필을 보이게 할 수 있음
- 검색 기능을 통해 다른사람 페이지로 이동 가능

## 상세 기술 설명

- 기본적으로 React클라이언트와 Express서버와 MongoDB데이터베이스 사용 중
- CSS는 대부분의 상황에서 Tailwind 이용 중
- 회원가입,로그인,로그아웃 기능 : Passport와 JWT를 통해 로컬스토리지에 토큰을 저장하고 인증받는 방식
- 암호화는 bcrypt를 통해 이루어짐
- 다크모드는 Zustand를 통해 로컬스토리지에 테마 상태를 저장하고 바디태그에 클래스를 추가하고 tailwind로 감지하는 방식
- 대부분 CRUD는 mongoose를 통해 스키마를 정의하고 model을 통해 스키마를 조작하고, 라우터를 통해 오는 요청을 Service쪽에서 처리함
- 로그인,로그아웃 상태에서의 서버요청을 토큰을 체크하는 미들웨어를 통해 분리시킴
- 마이페이지의 항목들을 선택적으로 View하는 방식은 Zustand를 통해 로컬스토리지에 뷰 여부를 저장함
- 쪽지 기능및 방명록 기능은 기본적인 CRUD외에도 폴링방식을 통해 실시간으로 Toast메시지로 수신여부를 확인할 수 있음
- 폴링이 필요한 요청은 리액트쿼리의 refetchInterval 기능을 통해 1초마다 서버로 요청을 보내며, 이전 데이터의 배열길이보다 길어질 때에만 변경을 감지하고 상태를 전달함(메시지 및 방명록이 추가되었을때만 보여져야하기 때문)
- 프로필 이미지에 대한 설정은 AWS의 S3버킷을 통해 저장됨
- 회원탈퇴 시에는 관련된 데이터를 모두 삭제하도록 처리함
- 방문자 수에 대한 데이터는 리액트쿼리의 staletime설정으로 인해 캐시된 데이터를 기준으로 get요청을 감지하기 때문에 무한정 올라가지는 못하도록 설정
- 통계에 대한 데이터는 해당 사용자에게 담긴 모든 데이터를 날짜기준으로 sorting하며, react-chartjs-2와 chart.js로 뷰를 구현함
- PDF기능은 html2canvas를 통해 html클래스 기준으로 캔버스를 생성하고 jspdf를 통해 pdf파일로 변환시킴

## 프로젝트 참여

프로젝트 참여를 환영합니다! 기여하려면 다음 단계를 수행하세요:

1. 프로젝트를 Fork하세요.
2. 자신만의 branch를 만드세요 (`git checkout -b feature/YourFeature`)
3. 변경 사항을 커밋하세요 (`git commit -m 'Add YourFeature'`)
4. branch를 push하세요 (`git push origin feature/YourFeature`)
5. Pull Requests를 오픈하고 develop 브랜치에 본인의 브랜치를 병합 요청하세요.

## 저작권

MIT 라이선스에 따라 배포됩니다. 자세한 내용은 '라이센스'를 참조하십시오.

## 연락 정보

이승현 - kubrickcode@gmail.com
정재훈 - wjdwogns120523@gmail.com
양재영 - yayww@naver.com
정원석 - ssukgoon@gmail.com
김기용 - kodinger17@gmail.com
정주현 - nb3065@gmail.com

## 폴더 트리

```
Folioverse
├─ client
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ cat.png
│  │  ├─ dark-mode.png
│  │  ├─ google.png
│  │  ├─ homepage
│  │  │  ├─ 1.png
│  │  │  ├─ 2.png
│  │  │  ├─ 3.png
│  │  │  ├─ followLike.png
│  │  │  ├─ message.png
│  │  │  ├─ pdfExport.png
│  │  │  └─ profileExample.png
│  │  ├─ kakao.png
│  │  ├─ logo
│  │  │  ├─ logo-dark.png
│  │  │  └─ logo-light.png
│  │  ├─ medal
│  │  │  ├─ bronze.png
│  │  │  ├─ gold.png
│  │  │  └─ silver.png
│  │  ├─ profile
│  │  │  ├─ profile-dark.png
│  │  │  └─ profile-light.png
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ App.jsx
│  │  │  ├─ ErrPage.jsx
│  │  │  ├─ HomePage
│  │  │  │  ├─ FirstGreet.jsx
│  │  │  │  ├─ FourthFolioSlide.jsx
│  │  │  │  ├─ FourthFooter.jsx
│  │  │  │  ├─ HomePage.jsx
│  │  │  │  ├─ HomePage.module.css
│  │  │  │  ├─ SecondCommunity.jsx
│  │  │  │  ├─ SecondProfile.jsx
│  │  │  │  └─ ThirdFolioSlide.jsx
│  │  │  ├─ HomePage.zip
│  │  │  ├─ LoadingOverLay.jsx
│  │  │  ├─ Login
│  │  │  │  ├─ Authorized.jsx
│  │  │  │  ├─ Login.jsx
│  │  │  │  └─ SocialButton.jsx
│  │  │  ├─ Network
│  │  │  │  ├─ FilterDownMenu.jsx
│  │  │  │  ├─ Network.jsx
│  │  │  │  ├─ Network.module.css
│  │  │  │  ├─ NetworkFilter.jsx
│  │  │  │  └─ NetworkProfile.jsx
│  │  │  ├─ Notification
│  │  │  │  ├─ Modal
│  │  │  │  │  ├─ DeleteModal.jsx
│  │  │  │  │  ├─ MailerModal.jsx
│  │  │  │  │  ├─ MessageBoxModal.jsx
│  │  │  │  │  ├─ MessageModal.jsx
│  │  │  │  │  ├─ Modal.jsx
│  │  │  │  │  ├─ Pagination.jsx
│  │  │  │  │  ├─ PostModal.jsx
│  │  │  │  │  ├─ VisitorBook.jsx
│  │  │  │  │  └─ WritePostModal.jsx
│  │  │  │  └─ Toast.jsx
│  │  │  ├─ SignUp
│  │  │  │  └─ SignUp.jsx
│  │  │  ├─ UserPage
│  │  │  │  ├─ AddData
│  │  │  │  │  ├─ AddAward.jsx
│  │  │  │  │  ├─ AddCareer.jsx
│  │  │  │  │  ├─ AddCertificate.jsx
│  │  │  │  │  ├─ AddData.jsx
│  │  │  │  │  ├─ AddEducation.jsx
│  │  │  │  │  └─ AddProject.jsx
│  │  │  │  ├─ Mvp.jsx
│  │  │  │  ├─ MvpSelector.jsx
│  │  │  │  ├─ PostList.jsx
│  │  │  │  ├─ Profile.jsx
│  │  │  │  ├─ SpeedDial
│  │  │  │  │  ├─ PdfReader.jsx
│  │  │  │  │  └─ SpeedDial.jsx
│  │  │  │  ├─ UserPage.jsx
│  │  │  │  └─ ViewMvp
│  │  │  │     ├─ Award.jsx
│  │  │  │     ├─ Career.jsx
│  │  │  │     ├─ Certificate.jsx
│  │  │  │     ├─ Education.jsx
│  │  │  │     └─ Project.jsx
│  │  │  └─ UserSetting
│  │  │     ├─ EditProfile.jsx
│  │  │     ├─ EditUserInfo.jsx
│  │  │     ├─ ManageFollow.jsx
│  │  │     ├─ UserSetting.jsx
│  │  │     └─ UserStats.jsx
│  │  ├─ CustomHooks.jsx
│  │  ├─ index.css
│  │  ├─ index.jsx
│  │  ├─ QueryProvider.jsx
│  │  ├─ store
│  │  │  ├─ modalStore.js
│  │  │  ├─ mvpSelectStore.js
│  │  │  ├─ styleClassStore.js
│  │  │  ├─ themeStore.js
│  │  │  ├─ toastStore.js
│  │  │  └─ userStore.js
│  │  └─ utils
│  │     └─ useQuery.jsx
│  ├─ tailwind.config.js
│  └─ vite.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.js
│  ├─ dailyEvent
│  │  └─ dailyMetrics.js
│  ├─ db
│  │  ├─ index.js
│  │  ├─ models
│  │  │  ├─ Award.js
│  │  │  ├─ Career.js
│  │  │  ├─ Certificate.js
│  │  │  ├─ DailyMetrics.js
│  │  │  ├─ Education.js
│  │  │  ├─ Follow.js
│  │  │  ├─ Like.js
│  │  │  ├─ Message.js
│  │  │  ├─ Post.js
│  │  │  ├─ Project.js
│  │  │  ├─ User.js
│  │  │  └─ VisitorBook.js
│  │  └─ schemas
│  │     ├─ award.js
│  │     ├─ career.js
│  │     ├─ certificate.js
│  │     ├─ dailyMetrics.js
│  │     ├─ education.js
│  │     ├─ follow.js
│  │     ├─ like.js
│  │     ├─ message.js
│  │     ├─ post.js
│  │     ├─ project.js
│  │     ├─ user.js
│  │     └─ visitorBook.js
│  ├─ lib
│  │  └─ config.js
│  ├─ middlewares
│  │  ├─ checkDuplicate.js
│  │  ├─ checkToken.js
│  │  ├─ errorMiddleware.js
│  │  └─ passport
│  │     ├─ google.js
│  │     ├─ index.js
│  │     ├─ kakao.js
│  │     └─ local.js
│  ├─ service
│  │  ├─ auth
│  │  │  ├─ check.js
│  │  │  ├─ login.js
│  │  │  └─ sign.js
│  │  ├─ awardService.js
│  │  ├─ careerService.js
│  │  ├─ certificateService.js
│  │  ├─ educationService.js
│  │  ├─ followService.js
│  │  ├─ imageService.js
│  │  ├─ likeService.js
│  │  ├─ messageService.js
│  │  ├─ othersService.js
│  │  ├─ postService.js
│  │  ├─ projectService.js
│  │  ├─ userService.js
│  │  └─ visitorBookService.js
│  └─ utils
│     ├─ changeRandomPassword.js
│     ├─ sendMailer.js
│     └─ verifyPassword.js
└─ uploads

```
