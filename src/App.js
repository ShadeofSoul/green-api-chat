import styled from "styled-components";
import ContactListComponent from "./components/ContactListComponents";
import ConversationComponent from "./components/ConversationComponents";
import Auth from "./components/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  background: #f8f9fb;
`;
function App() {
  return (
    // <BrowserRouter>
    <Container>
      <AuthContextProvider>
        <Main />
        {/* <Routes>
            <Route path="login" element={<Auth />} />
            <Route path="chat" element={<Main />} />
         
          </Routes> */}
      </AuthContextProvider>
    </Container>
    // </BrowserRouter>
  );
}

export default App;
