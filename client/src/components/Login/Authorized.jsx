//담당 : 이승현

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Authorized = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const { token } = location.search
        .substring(1)
        .split("&")
        .map((param) => param.split("="))
        .reduce((params, [key, value]) => ({ ...params, [key]: value }), {});

      localStorage.setItem("token", token);
      window.location.href = "/";
    } else {
      window.location.href = "/error/auth";
    }
  }, [location.search]);

  return <div>Redirecting...</div>;
};

export default Authorized;
