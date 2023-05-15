import styled from "styled-components";
import ContactListComponent from "./components/ContactListComponents";
import ConversationComponent from "./components/ConversationComponents";
import Auth from "./components/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import { useState } from "react";

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
          <Routes>
            <Route exact path="/login" element={<Auth />} />
            <Route exact path="/" element={<Main />} />
          </Routes>
        </AuthContextProvider>
      </Container>
    </BrowserRouter>
  );
}

export default App;
