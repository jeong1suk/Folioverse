import axios from "axios";

const host = import.meta.env.VITE_SERVER_HOST;

const App = () => {
  const handleClick = async () => {
    const result = await axios.get(host + "/dummy/network");
    console.log(result.data);
  };

  return (
    <>
      <button onClick={handleClick}>api 테스트 버튼</button>
    </>
  );
};

export default App;
