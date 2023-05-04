//담당 : 이승현

import DeleteModal from "./DeleteModal";
import useModalStore from "../../../store/modalStore";
import MessageModal from "./MessageModal";
import WritePostModal from "./WritePostModal";
import PostModal from "./PostModal";
import MessageBoxModal from "./MessageBoxModal";
import VisitorBook from "./VisitorBook";
import MailerModal from "./MailerModal";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const id = useModalStore((state) => state.id);
  const name = useModalStore((state) => state.name);
  const type = useModalStore((state) => state.type);
  const toggleOpen = useModalStore((state) => state.toggleOpen);

  return (
    <div
      tabIndex="-1"
      className={`fixed inset-0 z-50 p-4 overflow-x-hidden overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md ${
        !isOpen && "hidden"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-neutral-400 bg-transparent top:bg-neutral-200 top:text-neutral-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-neutral-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={toggleOpen}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {(type === "delete" && (
            <DeleteModal toggleOpen={toggleOpen} id={id} />
          )) ||
            (type === "message" && (
              <MessageModal id={id} name={name} toggleOpen={toggleOpen} />
            )) ||
            (type === "write" && <WritePostModal toggleOpen={toggleOpen} />) ||
            (type === "post" && <PostModal id={id} />) ||
            (type === "messageBox" && (
              <MessageBoxModal toggleOpen={toggleOpen} />
            )) ||
            (type === "visitorBook" && <VisitorBook id={id} />) ||
            (type === "mail" && <MailerModal toggleOpen={toggleOpen} />)}
        </div>
      </div>
    </div>
  );
};

export default Modal;
