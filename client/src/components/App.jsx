import axios from "axios";
import Layout from "./Layout/Layout";
const host = import.meta.env.VITE_SERVER_HOST;

const App = () => {
  const handleClick = async () => {
    const result = await axios.get(host + "/dummy/network");
    console.log(result.data);
  };

  return (
    <>
      <Layout /> {/* 정주현 */}
      <button onClick={handleClick}>api 테스트 버튼</button>
    </>
  );
};

export default App;
