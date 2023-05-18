import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { METHODS, API } from "../helpers/consts";
import { useAuth } from "./AuthContext";

export const chatContext = createContext();
export const useChat = () => {
  return useContext(chatContext);
};

const INIT_STATE = {
  message: "",
  idMessage: "",
  allMessages: [],
  phoneNumber: "",
  existswhatsapp: false,
  name: "",
};

const reducer = (chatState = INIT_STATE, action) => {
  switch (action.type) {
    case METHODS.sendMessage:
      return {
        ...chatState,
        message: action.payload,
      };
    case "send":
      return {
        ...chatState,
        idMessage: action.payload,
      };
    case "getMess":
      return {
        ...chatState,
        allMessages: action.payload,
      };
    case "sendMess":
      return {
        ...chatState,
        allMessages: [...chatState.allMessages, action.payload],
      };
    case METHODS.CheckWhatsapp:
      return {
        ...chatState,
        phoneNumber: action.payload,
      };
    case "add":
      return {
        ...chatState,
        existswhatsapp: action.payload,
      };
    case "addName":
      return {
        ...chatState,
        name: action.payload,
      };
    default:
      return chatState;
  }
};

const ChatContextProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(reducer, INIT_STATE);
  const { authData } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    getHistoryOfChat();

    const body = {
      chatId: chatState.phoneNumber + "@c.us",
      message: chatState.message,
    };
    axios
      .post(
        API +
          authData.idInstance +
          "/" +
          METHODS.sendMessage +
          "/" +
          authData.apiTokenInstance,
        body
      )
      .then((res) => {
        dispatch({
          type: "sendMess",
          payload: {
            ...body,
            sendByApi: true,
          },
        });
        dispatch({
          type: METHODS.sendMessage,
          payload: "",
        });
        // getHistoryOfChat();
      })
      .catch((error) => {
        alert("Не получилось отправить сообщение");
      });
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    const body = { phoneNumber: chatState.phoneNumber };
    axios
      .post(
        API +
          authData.idInstance +
          "/" +
          METHODS.CheckWhatsapp +
          "/" +
          authData.apiTokenInstance,
        body
      )
      .then((res) => {
        if (!res.data.existsWhatsapp) {
          alert(
            "Не найден такой контакт. Проверьте корректность номера телефона или же его подвяску к WhatsApp"
          );
        } else {
          dispatch({
            type: "add",
            payload: res.data.existsWhatsapp,
          });
          alert("Контакт успешно добавлен");
        }
      })
      .catch((error) => {
        alert(
          "Не найден такой контакт. Проверьте корректность номера телефона или же его подвяску к WhatsApp"
        );
      });
  };

  const getHistoryOfChat = () => {
    const body = {
      chatId: chatState.phoneNumber + "@c.us",
      count: 20,
    };
    console.log(body);
    axios
      .post(
        API +
          authData.idInstance +
          "/" +
          METHODS.GetChatHistory +
          "/" +
          authData.apiTokenInstance,
        body
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: "getMess",
          payload: res.data.reverse(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(chatState.allMessages);

  const values = {
    dispatch,
    chatState,
    handleSubmit,
    handleSubmitContact,
  };

  return <chatContext.Provider value={values}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
