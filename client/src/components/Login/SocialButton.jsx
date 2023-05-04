const host = import.meta.env.VITE_SERVER_HOST;

export const GoogleButton = () => {
  const handdleLogin = () => {
    location.href = host + "/auth/google";
  };
  return (
    <button
      onClick={handdleLogin}
      className="flex flex-row shadow-xl w-full mx-1 my-2 px-2 py-1 rounded-xl bg-white items-center hover:bg-neutral-100"
    >
      <img className="w-8 mt-1" src="/google.png" alt="구글 로그인 버튼" />
      <span className="text-center w-full font-light">
        Google 계정으로 로그인
      </span>
    </button>
  );
};

export const KakaoButton = () => {
  const handdleLogin = () => {
    location.href = host + "/auth/kakao";
  };
  return (
    <button
      onClick={handdleLogin}
      className="flex flex-row shadow-xl w-full mx-1 my-2 px-2 py-1 rounded-xl bg-white items-center bg-[#FEE500] hover:bg-[#fee500e2] text-[#000000 85%]"
    >
      <img className="mt-1 w-6" src="/kakao.png" alt="카카오 로그인 버튼" />
      <span className="text-center w-full font-light">카카오 로그인</span>
    </button>
  );
};
