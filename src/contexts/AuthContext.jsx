import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { METHODS, API } from "../helpers/consts";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};

const INIT_STATE = {
  user: false,
  userData: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case METHODS.GetSettings:
      return {
        ...state,
        userData: action.payload,
      };
    case "user":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [authData, setAuthData] = useState({
    idInstance: "",
    apiTokenInstance: "",
  });
  const navigate = useNavigate();

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
        dispatch({
          type: METHODS.GetSettings,
          payload: res.data,
        });
        dispatch({
          type: "user",
          payload: true,
        });
        navigate("/");
      })
      .catch((error) => {
        alert("Не найден такой инстанс. Попробуте ещё раз");
      });
  };

  const values = {
    authData,
    setAuthData,
    state,
    handleSubmit,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
