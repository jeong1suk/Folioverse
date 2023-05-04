# Folioverse

포트폴리오 제작 웹 사이트

구색 다 갖춰지면 전반적인 설명 여기 적을것

## 컨텐츠 목록

1. [시작하기](#시작하기)
   - [필수요건](#필수요건)
   - [설치](#설치)
2. [사용법](#사용법)
3. [프로젝트 참여](#프로젝트-참여)
4. [저작권](#저작권)
5. [연락 정보](#연락-정보)
6. [폴더 트리](#폴더-트리)

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
환경변수 부분 추후 이곳에 설명
```

client 폴더 내에도 .env 파일을 생성하고 다음과 같이 작성합니다

```ini
클라이언트 환경변수 부분 이곳에 추후 설명
```

5. npm run dev 시, localhost:3000에 백엔드 서버, localhost:5173에 클라이언트 서버가 동시에 실행됩니다.

<<<<<<< HEAD
본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.

Copyright 2023 엘리스 Inc. All rights reserved.
=======
## 사용법

이 사이트에 대한 클라이언트 입장에서의 사용법 이곳에 적을것

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
기타 팀원 이메일 등 이곳에.

Project Link: https://kdt-gitlab.elice.io/ai_track/class_07/web_project/team02/portfolio-share-service-racer

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
│  │  │  ├─ Login
│  │  │  │  ├─ Login.jsx
│  │  │  │  └─ Login.module.css
│  │  │  ├─ Network
│  │  │  │  ├─ Network.jsx
│  │  │  │  ├─ Network.module.css
│  │  │  │  ├─ NetworkFilter.jsx
│  │  │  │  └─ NetworkProfile.jsx
│  │  │  ├─ Notification
│  │  │  │  ├─ Modal
│  │  │  │  │  ├─ DeleteModal.jsx
│  │  │  │  │  ├─ MessageModal.jsx
│  │  │  │  │  └─ Modal.jsx
│  │  │  │  └─ Toast.jsx
│  │  │  ├─ SignUp
│  │  │  │  ├─ SignUp.jsx
│  │  │  │  └─ SignUp.module.css
│  │  │  ├─ UserPage
│  │  │  │  ├─ AddData
│  │  │  │  │  ├─ AddAward.jsx
│  │  │  │  │  ├─ AddCertificate.jsx
│  │  │  │  │  ├─ AddData.jsx
│  │  │  │  │  ├─ AddEducation.jsx
│  │  │  │  │  └─ AddProject.jsx
│  │  │  │  ├─ Mvp.jsx
│  │  │  │  ├─ Profile.jsx
│  │  │  │  ├─ SpeedDial
│  │  │  │  │  ├─ PdfReader.jsx
│  │  │  │  │  └─ SpeedDial.jsx
│  │  │  │  ├─ UserPage.jsx
│  │  │  │  └─ ViewMvp
│  │  │  │     ├─ Award.jsx
│  │  │  │     ├─ Certificate.jsx
│  │  │  │     ├─ Education.jsx
│  │  │  │     └─ Project.jsx
│  │  │  └─ UserSetting
│  │  │     ├─ Chart.jsx
│  │  │     ├─ EditProfile.jsx
│  │  │     ├─ EditUserInfo.jsx
│  │  │     ├─ ManageFollow.jsx
│  │  │     └─ UserSetting.jsx
│  │  ├─ CustomHooks.jsx
│  │  ├─ index.css
│  │  ├─ index.jsx
│  │  ├─ QueryProvider.jsx
│  │  ├─ store
│  │  │  ├─ modalStore.js
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
│  ├─ db
│  │  ├─ index.js
│  │  ├─ models
│  │  │  ├─ Award.js
│  │  │  ├─ Career.js
│  │  │  ├─ Certificate.js
│  │  │  ├─ Education.js
│  │  │  ├─ Project.js
│  │  │  └─ User.js
│  │  └─ schemas
│  │     ├─ award.js
│  │     ├─ career.js
│  │     ├─ certificate.js
│  │     ├─ comments.js
│  │     ├─ education.js
│  │     ├─ follow.js
│  │     ├─ like.js
│  │     ├─ project.js
│  │     └─ user.js
│  ├─ middlewares
│  │  ├─ checkToken.js
│  │  ├─ errorMiddleware.js
│  │  └─ passport
│  │     ├─ index.js
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
│  │  ├─ imageService.js
│  │  ├─ projectService.js
│  │  └─ userService.js
│  └─ utils
│     └─ verifyPassword.js
└─ uploads

```
>>>>>>> develop
