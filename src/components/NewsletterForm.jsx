import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { DeleteRecipient, sendNewsletter } from "../redux/recipientsSlice";
import UploadPanel from "./UploadPanel";
import Swal from "sweetalert2";
import ManageRecipients from "./ManageRecipients";
const Container = styled.article`
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  background-image: linear-gradient(90deg, #0cbccc 0%, #0069c0 100%);
  @media (max-width: 500px) {
    width: 100%;
    padding: 5px;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 300px) {
    width: 100%;
    padding: 0px;
    align-items: center;
    justify-content: center;
  }
`;
const ContainerSend = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 15px;
  @media (max-width: 500px) {
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
  }
`;

const TitleSend = styled.h1`
  margin-top: 5px;
  margin-bottom: 0px;
  text-align: flex-start;
  text-shadow: 3px 4px 1px gray;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const RecipientsList = styled.ol`
  display: flex;
  width: 90%;
  list-style-type: none;
  flex-direction: column;
  background-color: white;
  color: black;
  border-radius: 12px;
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
  }
  @media (max-width: 300px) {
    align-self: center;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
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
const Button = styled.button`
  width: 100px;
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
    width: 100px;
  }
`;

const Textarea = styled.textarea`
  display: flex;
  color: black;
  font-size: 14px;
  form-sizing: content;
  background-color: white;
  min-height: 100px; /* Set your desired minimum height */
  resize: none;
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
  @media (max-width: 300px) {
    width: 90%;
    align-self: center;
    padding: 3px;
  }
`;
const Input = styled.input`
  display: flex;
  border-radius: 20px;
  border: 2px solid lightgray;
  color: black;
  padding: 10px;
  font-size: 14px;
  -webkit-appearance: none;
  appearance: none;
  font-size: 14px;
  line-height: 14px;
  outline: none;
  background-color: #f6f7f8;
  &:hover {
    border: 2px solid lightblue;
  }
  @media (max-width: 300px) {
    width: 90%;
    align-self: center;
    padding: 3px;
  }
`;
const NewsletterForm = ({ recipients }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleFileUpload = (files) => {
    // Process or upload the files as needed
    setUploadedFiles(files);
  };
  const [selectedRecipient, setSelectedRecipient] = useState();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const searchedRecipient = recipients?.filter((el) => el.email.includes(search));
  const handleRemove = (id) => {
    dispatch(DeleteRecipient({ id }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadedFiles.length > 0 && title !== "" && content !== "") {
      dispatch(sendNewsletter({ title, content, uploadedFiles }));
    } else {
      Swal.fire("Error", "Please fill all the fields", "error");
    }
  };

  return (
    <Container>
      <ManageRecipients recipients={recipients} />
      <ContainerSend>
        <TitleSend>Send Newsletters</TitleSend>
        <SearchBar search={search} setSearch={setSearch} />
        <RecipientsList>
          {searchedRecipient?.map((el, index) => (
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
        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          maxlength={1000}
          placeholder="Fill the content of the newsletter here..."
          required={true}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <p style={{ color: "lightgray", fontWeight: "bold", marginTop: 0 }}>Maximum 1000 characters!</p>
        <UploadPanel onFileUpload={handleFileUpload} />
        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file) => (
            <li style={{ listStyleType: "none", marginTop: "15px" }} key={file.name}>
              {file.name}
            </li>
          ))}

        <Button onClick={(e) => handleSubmit(e)}>Send</Button>
      </ContainerSend>
    </Container>
  );
};

export default NewsletterForm;
