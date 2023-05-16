import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { METHODS, API } from "../helpers/consts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useContact } from "./ContactContext";

export const chatContext = createContext();
export const useChat = () => {
  return useContext(chatContext);
};

const INIT_STATE = {
  message: "",
  idMessage: "",
  allMessages: [],
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
    default:
      return chatState;
  }
};

const ChatContextProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(reducer, INIT_STATE);
  const { authData } = useAuth();
  const { contactState } = useContact();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMessages();
    const body = {
      chatId: contactState.phoneNumber + "@c.us",
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
        if (res.status === 200) {
          fetchMessages();

          dispatch({
            type: "send",
            payload: res.data.idMessage,
          });
        }
      })
      .catch((error) => {
        alert("Не получилось отправить сообщение");
      });
  };

  // useEffect(() => {
  const fetchMessages = async () => {
    try {
      const [myMessagesResponse, friendMessagesResponse] = await axios.all([
        axios.get(
          API +
            authData.idInstance +
            "/" +
            METHODS.lastIncomingMessages +
            "/" +
            authData.apiTokenInstance
        ),
        axios.get(
          API +
            authData.idInstance +
            "/" +
            METHODS.LastOutgoingMessages +
            "/" +
            authData.apiTokenInstance
        ),
      ]);
      dispatch({
        type: METHODS.sendMessage,
        payload: "",
      });

      const allMessages = [
        ...myMessagesResponse.data,
        ...friendMessagesResponse.data,
      ];
      allMessages.sort((a, b) => a.timestamp - b.timestamp);

      dispatch({
        type: "getMess",
        payload: allMessages,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // }, [state.message]);

  console.log(chatState);

  const values = {
    dispatch,
    chatState,
    handleSubmit,
    fetchMessages,
  };

  return <chatContext.Provider value={values}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
