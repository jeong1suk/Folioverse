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

/** `Axios` 를 이용하여 POST요청을 보냅니다. `url` 또는 `dataObj` 의 값이 변경되면 재호출합니다.
 * @param {string} url 요청할 url을 입력합니다.
 * @param {object} dataObj 요청할 데이터객체를 입력합니다.
 * @returns {object} { data, error, loading } 을 반환합니다.
 */
const useAxiosPost = (url, dataObj) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(url, dataObj);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    postData();
  }, [url, dataObj]);

  return { data, error, loading };
};

/** `Axios` 를 이용하여 PUT요청을 보냅니다. `url` 또는 `dataObj` 또는 `id` 의 값이 변경되면 재호출합니다.
 * @param {string} url 요청할 url을 입력합니다.
 * @param {object} dataObj 갱신할 데이터객체를 입력합니다.
 * @param {number} id 갱신할 데이터의 id를 입력합니다.
 * @returns {object} { data, error, loading } 을 반환합니다.
 */
const useAxiosPut = (url, dataObj, id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const putData = async () => {
      setLoading(true);
      try {
        const res = await axios.put(`${url}/${id}`, dataObj);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    putData();
  }, [url, dataObj, id]);

  return { data, error, loading };
};

/** `Axios` 를 이용하여 DELETE요청을 보냅니다. `url` 또는 `id` 의 값이 변경되면 재호출합니다.
 * @param {string} url 요청할 url을 입력합니다.
 * @param {string} id 삭제할 데이터의 id를 입력합니다.
 * @returns {object} { error, loading } 을 반환합니다.
 */
const useAxiosDelete = (url, id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const deleteData = async () => {
      setLoading(true);
      try {
        await axios.delete(`${url}/${id}`);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    deleteData();
  }, [url, id]);

  return { error, loading };
};

export { useAxiosGet, useAxiosPost, useAxiosPut, useAxiosDelete };
