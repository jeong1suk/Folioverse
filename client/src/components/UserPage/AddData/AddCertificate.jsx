//담당 : 이승현

import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AddCertificate = ({ certificate, setCertificate, setIsValid }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();

  useEffect(() => {
    if (certificate.name && certificate.date && certificate.agency) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [certificate.name, certificate.date, certificate.agency]);

  const handleDateChange = (date) => {
    setCertificate({ ...certificate, date });
    setShowCalendar(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
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
        onFocus={() => setShowCalendar(true)}
        value={formatDate(certificate?.date)}
        readOnly
        required
      />
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-12 left-0 transform -translate-y-full"
        >
          <Calendar onChange={handleDateChange} value={certificate.date} />
        </div>
      )}
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
    </div>
  );
};

export default AddCertificate;
