import React, { useEffect, useState } from "react";
import ContactListComponent from "./ContactListComponents";
import ConversationComponent from "./ConversationComponents";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Main = () => {
  const navigate = useNavigate();
  const { state } = useAuth();

  useEffect(() => {
    if (state.user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <ContactListComponent />
      <ConversationComponent />
    </>
  );
};

export default Main;
