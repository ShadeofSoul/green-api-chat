import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { METHODS, API } from "../helpers/consts";

export const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    idInstance: "",
    apiTokenInstance: "",
  });
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        API +
          authData.idInstance +
          "/" +
          METHODS.GetSettings +
          "/" +
          authData.apiTokenInstance
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setUser(res.data.wid);
        console.log(user);
      })
      .catch((error) => {
        alert("Не найден такой инстанс. Попробуте ещё раз");
      });
  };

  const values = {
    authData,
    setAuthData,
    handleSubmit,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
