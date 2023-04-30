//담당 : 이승현

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useModalStore from "../../../store/modalStore";

const SpeedDial = ({ id }) => {
  const [state, setState] = useState(false);
  const setModal = useModalStore((state) => state.setModal);

  return (
    <div
      data-dial-init
      className="fixed bottom-6 right-6 group"
      onMouseOver={() => setState(true)}
      onMouseLeave={() => setState(false)}
    >
      <div
        className={`${
          !state && "hidden"
        } flex flex-col items-center mb-4 space-y-2`}
      >
        <button
          type="button"
          className="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          onClick={downloadPortfolioAsPDF}
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 mx-auto mt-px"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 10-1.414-1.414l-.293.293V9z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-32 top-1/2 bg-white border px-2 py-1 rounded-full dark:bg-gray-700 dark:border-gray-600">
            PDF로 다운로드
          </span>
        </button>
        <button
          type="button"
          className="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          onClick={() => setModal(id, "post")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-auto mt-px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>

          <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-28 top-1/2 bg-white border px-2 py-1 rounded-full dark:bg-gray-700 dark:border-gray-600">
            게시글 작성
          </span>
        </button>
      </div>
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-text-outside-button-square"
        aria-controls="speed-dial-menu-text-outside-button-square"
        aria-expanded="false"
        className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 transition-transform group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
};

const downloadPortfolioAsPDF = async () => {
  const portfolioContent = document.querySelector(".pdf-area");

  try {
    html2canvas(portfolioContent).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = 190;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let yPosition = 0;

      while (yPosition < contentHeight) {
        pdf.addImage(
          imgData,
          "PNG",
          10,
          10 - yPosition,
          contentWidth,
          contentHeight
        );
        yPosition += pageHeight - 20;

        if (yPosition < contentHeight) {
          pdf.addPage();
        }
      }

      pdf.save("portfolio.pdf");
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default SpeedDial;
