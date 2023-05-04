// 정주현
import logoImg from "/logo/logo-dark.png";
import { Link } from "react-router-dom";

const FourthFooter = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src={logoImg}
                className="h-[90px] mr-3"
                alt="FlowBite Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-8 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Front
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.notion.so/052e7f34263d47e88aed5927b4be6043#c571e7ef64934ef68dc6c8522ad94e04"
                    className="hover:underline"
                  >
                    김기용
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.notion.so/052e7f34263d47e88aed5927b4be6043#c571e7ef64934ef68dc6c8522ad94e04"
                    className="hover:underline"
                  >
                    정원석
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/052e7f34263d47e88aed5927b4be6043#c571e7ef64934ef68dc6c8522ad94e04"
                    className="hover:underline"
                  >
                    정주현
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Back
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.notion.so/052e7f34263d47e88aed5927b4be6043#c571e7ef64934ef68dc6c8522ad94e04"
                    className="hover:underline"
                  >
                    양재영
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.notion.so/052e7f34263d47e88aed5927b4be6043#c571e7ef64934ef68dc6c8522ad94e04"
                    className="hover:underline"
                  >
                    이승현
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/052e7f34263d47e88aed5927b4be6043#c571e7ef64934ef68dc6c8522ad94e04"
                    className="hover:underline"
                  >
                    정재훈
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Page
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://kdt-gitlab.elice.io/ai_track/class_07/web_project/team02/portfolio-share-service-racer"
                    className="hover:underline"
                  >
                    GitLab
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/300f8cc7fc9f4cf2909250ebb4259f6e"
                    className="hover:underline"
                  >
                    Notion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FourthFooter;
