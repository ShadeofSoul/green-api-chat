import styled from "styled-components";
import ContactListComponent from "./components/ContactListComponents";
import ConversationComponent from "./components/ConversationComponents";
import Auth from "./components/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import { useState } from "react";
import ContactContextProvider from "./contexts/ContactContext";
import ChatContextProvider from "./contexts/ChatContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  background: #f8f9fb;
`;
function App() {
  return (
    <BrowserRouter>
      <Container>
        <AuthContextProvider>
          <ContactContextProvider>
            <ChatContextProvider>
              <Routes>
                <Route exact path="/login" element={<Auth />} />
                <Route exact path="/" element={<Main />} />
              </Routes>
            </ChatContextProvider>
          </ContactContextProvider>
        </AuthContextProvider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
