import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { DeleteRecipient } from "../redux/recipientsSlice";
import Swal from "sweetalert2";
const Container = styled.article`
  display: flex;
  padding: 0px;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background-image: linear-gradient(90deg, #0cbccc 0%, #0069c0 100%);
  @media (max-width: 500px) {
    justify-content: flex-start;
    justify-content: center;
    align-items: center;
    padding: 5px;
    background-image: linear-gradient(180deg, #0069c0 0%, #0cbccc 100%);
  }
  @media (max-width: 300px) {
    align-self: center;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
  }
`;

const Title = styled.h1`
  text-align: flex-start;
  text-shadow: 3px 4px 1px gray;
  margin-top: 51.2px;
  margin-bottom: 51.2px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const RecipientsList = styled.ol`
  display: flex;
  list-style-type: none;
  flex-direction: column;
  background-color: white;
  color: black;
  border-radius: 12px;
  max-height: 400px;
  padding: 15px;
  min-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin; /* Mac-like scrollbar width */
  scrollbar-color: gray lightgray; /* Mac-like scrollbar colors */

  /* Webkit-specific styles for Chrome/Safari browsers */
  &::-webkit-scrollbar {
    width: 10px; /* Adjust as needed */
    background-color: lightgray; /* Scrollbar track color */
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray; /* Scrollbar thumb color */
    border-radius: 5px; /* Rounded thumb */
  }
  @media (max-width: 500px) {
    font-size: 12px;
    width: 90%;
  }
  @media (max-width: 300px) {
    align-self: center;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
  }
`;
const Recipient = styled.li`
  width: 100%;
  align-self: center;
  padding: 10px;
  border-radius: 12px;
  @media (max-width: 300px) {
    align-self: center;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
  }
`;

const ButtonRemove = styled.button`
  width: 150px;
  align-self: center;
  align-items: center;
  text-align: center;
  background-color: #ff368f;
  padding: 15px;
  border-radius: 20px;
  border: 2px solid #ff368f;
  font-size: 16px;
  margin-bottom: 5px;
  &:hover {
    border: 2px solid #0cbccc;
    font-weight: bold;
    color: #0cbccc;
  }
  @media (max-width: 500px) {
    width: 130px;
  }
`;

const ManageRecipients = ({ recipients }) => {
  const [selectedRecipient, setSelectedRecipient] = useState();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const searchedRecipient = recipients?.filter((el) => el.email.includes(search));
  const handleRemove = (id) => {
    if (selectedRecipient) {
      dispatch(DeleteRecipient({ id }));
    } else Swal.fire("Error", "Please select a recipient to remove from the database", "error");
  };

  return (
    <Container>
      <Title>Newsletter's recipients</Title>
      <SearchBar search={search} setSearch={setSearch}></SearchBar>
      <RecipientsList>
        {searchedRecipient?.map((el) => (
          <Recipient
            style={{
              backgroundColor: selectedRecipient === el.id ? "#ff368f" : "white",
            }}
            value={el.id}
            selectedRecipient={selectedRecipient}
            onClick={(e) => {
              if (selectedRecipient === e.target.value) {
                setSelectedRecipient(null);
              } else {
                setSelectedRecipient(e.target.value);
              }
            }}
            key={el.id}
          >
            {el.email}
          </Recipient>
        ))}
      </RecipientsList>

      <ButtonRemove onClick={() => handleRemove(selectedRecipient)}>Unsubscribe user</ButtonRemove>
    </Container>
  );
};

export default ManageRecipients;
