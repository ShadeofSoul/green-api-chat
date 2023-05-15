import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { METHODS, API } from "../helpers/consts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { contactList, messagesList } from "../Data";
import { useContact } from "./ContactContext";

export const chatContext = createContext();
export const useChat = () => {
  return useContext(chatContext);
};

const INIT_STATE = {
  message: "",
  idMessage: "",
  senderID: 0,
};

const reducer = (chatState = INIT_STATE, action) => {
  switch (action.type) {
    case METHODS.SendMessage:
      return {
        ...chatState,
        message: action.payload,
      };
    case "send":
      return {
        ...chatState,
        idMessage: action.payload,
      };
    default:
      return chatState;
  }
};

const ChatContextProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(reducer, INIT_STATE);
  const { authData } = useAuth();
  const { state } = useContact();
  console.log(chatState);

  const getMessage = () => {
    axios
      .get(
        API +
          authData.idInstance +
          "/" +
          METHODS.ReceiveNotification +
          "/" +
          authData.apiTokenInstance
      )
      .then((res) => {
        console.log(res.data.body);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      chatId: state.phoneNumber + "@c.us",
      message: chatState.message,
    };
    console.log(body);
    axios
      .post(
        API +
          authData.idInstance +
          "/" +
          METHODS.SendMessage +
          "/" +
          authData.apiTokenInstance,
        body
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "send",
          payload: res.data.idMessage,
        });
        messagesList.push(chatState);
        console.log(messagesList);
        // getMessage();
      })
      .catch((error) => {
        alert(
          "Не найден такой контакт. Проверьте корректность номера телефона или же его подвяску к WhatsApp"
        );
      });
  };
  const values = { dispatch, chatState, handleSubmit };

  return <chatContext.Provider value={values}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
