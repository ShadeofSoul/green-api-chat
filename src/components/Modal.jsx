import React from "react";
import styled from "styled-components";
import { useChat } from "../contexts/ChatContext";

const ModalDiv = styled.div`
  display: ${(p) => p.block && p.block};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;
const ContentDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: auto;
  padding: 2rem;
  transform: translate(-50%, -50%);
  background: white;
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #25d366;
  border: none;
  border-radius: 3px;
  margin-right: 15px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  :hover {
    background: #075e54;
  }
`;

export const StyledModal = ({ handleClose, show, children }) => {
  const { handleSubmitContact } = useChat();

  return (
    <ModalDiv block={show ? "block" : "none"}>
      <ContentDiv>
        {children}
        <Button onClick={handleSubmitContact}>Добавить контакт</Button>
        <Button style={{ marginLeft: "70%" }} onClick={handleClose}>
          Закрыт
        </Button>
      </ContentDiv>
    </ModalDiv>
  );
};
