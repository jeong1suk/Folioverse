//담당 : 이승현

const EditProfile = () => {
  return (
    <>
      <h1 className="border">프로필 설정</h1>
      <section className="flex flex-row border">
        <div className="border basis-3/4">
          <article>이름 수정 칸</article>
          <article>이메일</article>
        </div>
        <article className="border basis-1/4">프로필 사진</article>
      </section>
      <section>
        <article>한줄 소개 수정 칸</article>
      </section>
    </>
  );
};

export default EditProfile;
