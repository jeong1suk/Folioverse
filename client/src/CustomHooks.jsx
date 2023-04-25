// 정주현

import { useState, useEffect } from "react";
import axios from "axios";

/** URL에 대한 Axios요청 Hook
 * @param {string} url
 * @returns {object} data, error, loading
 */
const useAxiosHook = (url) => {
  const [data, setData] = useState([] || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useAxiosHook;
