const Pagination = ({
  content,
  handlePageChange,
  itemsPerPage,
  currentPage,
}) => {
  return (
    <nav className="text-center">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="block px-3 py-2 ml-0 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-l-lg hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {Array.from(
          { length: Math.ceil(content?.length / itemsPerPage) },
          (_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-neutral-200 dark:bg-neutral-800"
                    : ""
                } px-4 py-2 mx-2 rounded dark:text-neutral-300`}
              >
                {index + 1}
              </button>
            </li>
          )
        )}
        <li>
          <a
            href="#"
            className="block px-3 py-2 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-r-lg hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              const totalPages = Math.ceil(content?.length / itemsPerPage);
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
