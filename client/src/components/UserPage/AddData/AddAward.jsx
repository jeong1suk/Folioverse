//담당 : 이승현

import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AddAward = ({ award, setAward, setIsValid }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();

  useEffect(() => {
    if (award.name && award.date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [award.name, award.date]);

  const handleDateChange = (date) => {
    setAward({ ...award, date });
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
        placeholder="수상 내역(필수)"
        onChange={(e) => setAward({ ...award, name: e.target.value })}
        value={award.name}
        maxLength={20}
        required
      />
      <input
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="수상 날짜(필수)"
        onFocus={() => setShowCalendar(true)}
        value={formatDate(award?.date)}
        readOnly
        required
      />
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-12 left-0 transform -translate-y-full"
        >
          <Calendar onChange={handleDateChange} value={award.date} />
        </div>
      )}
    </div>
  );
};

export default AddAward;
