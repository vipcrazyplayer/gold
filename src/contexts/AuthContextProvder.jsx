import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { API } from "../helpers/consts";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

const AuthContextProvder = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState("");
  async function handleRegister(formData, navigate) {
    try {
      const res = await axios.post(`${API}account/register/`, formData);
      setError("");
      navigate("/");
    } catch (err) {
      alert(Object.values(err.response.data).flat(2)[0]);
      setError(Object.values(err.response.data).flat(2)[0]);
    }
  }

  const handleLogin = async (formData, email, navigate) => {
    try {
      const res = await axios.post(`${API}account/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      setCurrentUser(email);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.detail);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser("");
  };

  const checkAuth = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      //! config
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.post(
        `${API}account/token/refresh/`,
        {
          refresh: tokens.refresh,
        },
        config
      );
      localStorage.setItem(
        "tokens",
        JSON.stringify({
          access: res.data.access,
          refresh: tokens.refresh,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <authContext.Provider
      value={{
        handleRegister,
        handleLogin,
        handleLogout,
        checkAuth,
        error,
        currentUser,
        setError,
        setCurrentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvder;
