import styled from "styled-components";
import { SearchContainer, SearchInput } from "./ContactListComponents";
import { METHODS } from "../helpers/consts";
import { useChat } from "../contexts/ChatContext";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-flow: column nowrap;
  flex-direction: column;
  height: 100%;
  flex: 2;
  background: #f6f7f8;
`;
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 15px;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;

const EmojiImage = styled.img`
  width: 30px;
  height: 28px;
  opacity: 0.4;
  cursor: pointer;
  padding-left: 10px;
`;
const SendiImage = styled.img`
  width: 30px;
  height: 28px;
  opacity: 0.4;
  cursor: pointer;
  padding-right: 10px;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5ddd6;
`;

const MessageDiv = styled.div`
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  display: flex;
  margin: 5px 16px;
`;

const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  max-width: 50%;
  color: #303030;
  padding: 8px 10px;
  font-size: 19px;
`;

const ConversationComponent = () => {
  const { dispatch, chatState, handleSubmit } = useChat();
  const { state } = useAuth();

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch({
      type: METHODS.sendMessage,
      payload: value,
    });
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src="/profile/pp1.png" />
        {chatState.name}
      </ProfileHeader>
      <MessageContainer>
        {chatState?.allMessages?.map((messageData) => (
          <MessageDiv isYours={messageData.sendByApi ? true : false}>
            <Message isYours={messageData.sendByApi ? true : false}>
              {[messageData.textMessage || messageData.message]}{" "}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer>
      <ChatBox>
        <SearchContainer>
          <EmojiImage src={"/data.svg"} />
          <SearchInput
            value={chatState.message}
            onChange={handleChange}
            placeholder="Type a message"
          />
          <SendiImage src={"/-send_90420.svg"} onClick={handleSubmit} />
        </SearchContainer>
      </ChatBox>
    </Container>
  );
};
export default ConversationComponent;
