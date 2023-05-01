// 정주현
// 수정필요

import { useState, useEffect } from "react";
import axios from "axios";

/** `Axios` 를 이용하여 GET요청을 보냅니다. `url` 의 값이 변경되면 재호출합니다.
 * @param {string} url 요청할 url을 입력합니다.
 * @returns {object} { data, error, loading } 을 반환합니다.
 */
const useAxiosGet = (url) => {
  const [data, setData] = useState([] || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getData();
  }, [url]);

  return { data, error, loading };
};

export { useAxiosGet };
