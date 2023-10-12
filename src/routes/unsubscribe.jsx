import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { DeleteRecipient } from "../redux/recipientsSlice";
import { ValidateEmail } from "../assets/validations/validations";
import Swal from "sweetalert2";
const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  min-height: 100vh;
  background-image: linear-gradient(90deg, #0069c0 0%, #0cbccc 100%);
`;
const Title = styled.h1`
  text-align: flex-start;
  color: white;
  line-height: 1.5;
  text-shadow: 3px 4px 1px gray;
  -webkit-background-clip: text;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const Subtitle = styled.h2`
  color: white;
  text-align: center
  padding: 15px;
  @media (max-width: 550px) {
    font-size: 16px;
  }
`;
const ErrorText = styled.p`
  color: orange;
  text-align: center
  padding: 15px;
  @media (max-width: 550px) {
    font-size: 16px;
  }
`;
const Input = styled.input`
  display: flex;
  align-self: center;
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
const Button = styled.button`
  width: 130px;
  align-self: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  background-color: #ff368f;
  padding: 15px;
  border-radius: 20px;
  border: 2px solid #ff368f;
  font-size: 16px;
  margin-bottom: 0px;
  &:hover {
    border: 2px solid #0cbccc;
    color: #0cbccc;
  }
  @media (max-width: 500px) {
    width: 130px;
  }
`;
const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  console.log(email, "el email");
  const handleUnsubscribe = (e) => {
    e.preventDefault();
    if (email.length !== 0 && !errors?.email) dispatch(DeleteRecipient({ email }));
    else Swal.fire("Error", "Please enter a valid email!", "error");
  };
  return (
    <Container onSubmit={(e) => handleUnsubscribe(e)}>
      <Navbar />
      <Title>We are very sorry to see you go!</Title>
      <Subtitle>Please confirm your email to unsubscribe!</Subtitle>
      <Input
        onBlur={() => ValidateEmail(email, errors, setErrors)}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      ></Input>
      <ErrorText>{errors?.email}</ErrorText>
      <Button type="submit">Unsubscribe!</Button>
    </Container>
  );
};

export default Unsubscribe;
