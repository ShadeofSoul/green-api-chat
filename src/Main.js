import React from "react";
import ContactListComponent from "./components/ContactListComponents";
import ConversationComponent from "./components/ConversationComponents";
import { useAuth } from "./contexts/AuthContext";
import Auth from "./components/Auth";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  const { user } = useAuth;
  console.log(user);
  return (
    <>
      {user ? (
        <>
          <ContactListComponent />
          <ConversationComponent />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Main;
