//담당 : 이승현

const AddAward = ({ award, setAward }) => {
  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="수상 내역"
        onChange={(e) => setAward({ ...award, name: e.target.value })}
        value={award.name}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="수상 날짜"
        onChange={(e) => setAward({ ...award, date: e.target.value })}
        value={award.date}
        maxLength={20}
      />
    </>
  );
};

export default AddAward;
