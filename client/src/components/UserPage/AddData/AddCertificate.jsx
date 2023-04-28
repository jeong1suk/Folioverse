//담당 : 이승현

const AddCertificate = ({ certificate, setCertificate }) => {
  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="자격증 명"
        onChange={(e) =>
          setCertificate({ ...certificate, name: e.target.value })
        }
        value={certificate.name}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="취득일"
        onChange={(e) =>
          setCertificate({ ...certificate, date: e.target.value })
        }
        value={certificate.date}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="발급 기관"
        onChange={(e) =>
          setCertificate({ ...certificate, agency: e.target.value })
        }
        value={certificate.agency}
        maxLength={20}
      />
    </>
  );
};

export default AddCertificate;
