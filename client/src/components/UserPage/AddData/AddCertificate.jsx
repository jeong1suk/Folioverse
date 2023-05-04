//담당 : 이승현

import { useEffect } from "react";

const AddCertificate = ({ certificate, setCertificate, setIsValid }) => {
  useEffect(() => {
    if (certificate.name && certificate.date && certificate.agency) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [certificate.name, certificate.date, certificate.agency]);

  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="자격증 명(필수)"
        onChange={(e) =>
          setCertificate({ ...certificate, name: e.target.value })
        }
        value={certificate.name}
        maxLength={30}
      />
      <input
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="취득일(필수)"
        onChange={(e) =>
          setCertificate({ ...certificate, date: e.target.value })
        }
        value={certificate.date}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="발급 기관(필수)"
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
