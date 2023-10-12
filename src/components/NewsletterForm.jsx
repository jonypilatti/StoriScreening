import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import {
  DeleteRecipient,
  fetchEmailsSent,
  fetchNewsletters,
  fetchRecipients,
  sendNewsletter,
} from "../redux/recipientsSlice";
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
  list-style-type: none;
  flex-direction: column;
  background-color: white;
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 12px;
  padding: 15px;
  min-height: 200px;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin; /* Mac-like scrollbar width */
  scrollbar-color: gray lightgray; /* Mac-like scrollbar colors */
  align-items: center;
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
    padding: 5px;
  }
`;
const Recipient = styled.li`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;

  align-self: center;
  padding: 10px;
  border-radius: 12px;
  @media (max-width: 300px) {
    align-self: center;
    justify-content: space-between;

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
  margin-top: 0px;
  margin-bottom: 0px;
  &:hover {
    border: 2px solid #0cbccc;
    color: #0cbccc;
  }
  @media (max-width: 500px) {
    width: 100px;
  }
`;
const ButtonPlaceholder = styled.button`
  width: 100px;
  min-height: 30px;
  align-self: center;
  align-items: center;
  text-align: center;
  background-color: white;
  padding: 15px;
  border-radius: 20px;
  border: 0px solid #ff368f;
  font-size: 16px;
  margin-bottom: 5px;
  &:hover {
    border: 0px solid #0cbccc;
    color: #0cbccc;
  }
  @media (max-width: 500px) {
    width: 100px;
  }
`;
const ButtonRemove = styled.button`
  width: 100px;
  min-height: 30px;
  align-self: center;
  align-items: center;
  text-align: center;
  background-color: #ff368f;
  padding: 15px;
  border-radius: 20px;
  border: 1px solid white;
  font-size: 16px;
  margin-bottom: 5px;
  &:hover {
    border: 1px solid #0cbccc;
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
const Subtitle = styled.h2`
  color: white;
  text-align: flex-start;
  padding: 15px;
  @media (max-width: 550px) {
    font-size: 16px;
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
  const [temporaryRecipients, setTemporaryRecipients] = useState([...recipients]);
  console.log(temporaryRecipients, "los recipients", recipients);
  const searchedRecipient = temporaryRecipients?.filter((el) => el.email.includes(search));
  const handleRemove = (id) => {
    setTemporaryRecipients(temporaryRecipients?.filter((el) => el.id !== id));
  };
  const Refresh = () => {
    setTemporaryRecipients([...recipients]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadedFiles.length > 0 && title !== "" && content !== "") {
      console.log(uploadedFiles, "los files");
      dispatch(sendNewsletter({ title, content, uploadedFiles, temporaryRecipients }));
    } else {
      Swal.fire("Error", "Please fill all the fields", "error");
    }
  };
  useEffect(() => {
    Refresh();
  }, [recipients]);
  return (
    <Container>
      <ManageRecipients recipients={recipients} />
      <ContainerSend
        enctype="multipart/form-data"
        action="/sendNewsletter"
        method="post"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TitleSend>Send Newsletters</TitleSend>
        <Subtitle>
          The list below shows the recipients of the newsletter. You can select one to remove one if you wish. The
          recipient will still be subscribed but won't receive this particular newsletter.
        </Subtitle>
        <SearchBar search={search} setSearch={setSearch} />
        <RecipientsList>
          {searchedRecipient?.map((el) => (
            <Recipient
              style={{
                backgroundColor: selectedRecipient === el.id ? "#ff368f" : "white",
                color: selectedRecipient === el.id ? "white" : "black",
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
              {selectedRecipient && selectedRecipient === el.id ? (
                <ButtonRemove type="button" onClick={() => handleRemove(selectedRecipient)}>
                  Remove
                </ButtonRemove>
              ) : (
                <ButtonPlaceholder type="button" style={{ zIndex: -1 }}></ButtonPlaceholder>
              )}
            </Recipient>
          ))}
        </RecipientsList>
        <Button type="button" onClick={() => Refresh()}>
          Refresh
        </Button>
        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          maxlength={1000}
          placeholder="Fill the content of the newsletter here..."
          required={true}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <p style={{ color: "lightgray", fontWeight: "bold", marginTop: 0 }}>
          If written in HTML Code it is captured!. Maximum 1000 characters!
        </p>
        <UploadPanel onFileUpload={handleFileUpload} />
        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file) => (
            <li style={{ listStyleType: "none", marginTop: "15px" }} key={file.name}>
              {file.name}
            </li>
          ))}

        <Button type="submit">Send</Button>
      </ContainerSend>
    </Container>
  );
};

export default NewsletterForm;
