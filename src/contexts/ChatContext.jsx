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
  allMessages: [],
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
  const { state } = useContact();
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
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

    fetchMessages();
  }, [state.existswhatsapp]);

  console.log(chatState);

  // Код отображения чата, используя полученные данные

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      chatId: state.phoneNumber + "@c.us",
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
          type: "send",
          payload: res.data.idMessage,
        });
        messagesList.push(chatState);
      })
      .catch((error) => {
        alert("Не получилось отправить сообщение");
      });
  };
  const values = {
    dispatch,
    chatState,
    handleSubmit,
  };

  return <chatContext.Provider value={values}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
