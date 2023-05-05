import { useEffect, useState } from "react";
import { useQueryGet } from "../../utils/useQuery";

const RedDot = () => {
  const [isRead, setIsRead] = useState(0);
  const { data } = useQueryGet("/message/is-read", "getIsRead");
  useEffect(() => {
    setIsRead(data?.result);
    console.log(data?.result);
  }, [data]);
  return (
    <span
      className={`${
        isRead === 1 && "hidden"
      } top-0 right-0 absolute w-3 h-3 bg-red-500 rounded-full`}
    ></span>
  );
};

export default RedDot;
