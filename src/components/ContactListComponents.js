import styled from "styled-components";
import { contactList } from "../Data";
import { useState } from "react";
import { StyledModal } from "./Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 0.8;
`;
const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 15px;
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const SearchBox = styled.div`
  display: flex;
  background: #f6f6f6;
  padding: 10px;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 20px 0;
`;
const SearchIcon = styled.img`
  width: 28px;
  height: 28px;
  padding-left: 10px;
`;
export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 15px;
  font-size: 17px;
  margin-left: 10px;
`;
const ContactItem = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;
  padding: 15px 12px;
`;

const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
`;
const ContactName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;
const MessageText = styled.span`
  width: 20%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba (0, 0, 0, 0.8);
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 19px;
`;

const PluseImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  left: 20px;
`;
const Input = styled.input`
  width: 95%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const ContactComponent = (props) => {
  const { userData } = props;
  return (
    <ContactItem>
      <ProfileIcon src={userData.profilePic} />
      <ContactInfo>
        <ContactName>{userData.name}</ContactName>
        <MessageText>Hello</MessageText>
      </ContactInfo>
      <MessageText>10:04 PM</MessageText>
    </ContactItem>
  );
};

const ContactListComponent = () => {
  const [isPopOpen, setIsPosOpen] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
  };
  return (
    <Container>
      <StyledModal show={isPopOpen} handleClose={() => setIsPosOpen(false)}>
        <div style={{ color: "black" }}>
          <Input
            type="text"
            name="idInstance"
            placeholder="idChat"
            // value={authData.idInstance}
            onChange={handleChange}
          />
        </div>
      </StyledModal>
      <ProfileInfoDiv>
        <ProfileImage src="/profile/profilephoto.jpeg" />
      </ProfileInfoDiv>
      <SearchBox>
        <SearchContainer>
          <SearchIcon src={"/search-icon.svg"} />
          <SearchInput placeholder="Search or start new chat" />
        </SearchContainer>
      </SearchBox>
      {contactList.map((userData) => (
        <ContactComponent userData={userData} />
      ))}
      <PluseImage src={"/pluse.svg"} onClick={() => setIsPosOpen(!isPopOpen)} />
    </Container>
  );
};

export default ContactListComponent;
