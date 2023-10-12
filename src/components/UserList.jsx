import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AddRecipient } from "../redux/recipientsSlice";
import { ValidateEmail, ValidateLastName, ValidateName } from "../assets/validations/validations";
import Schedules from "./Schedules";
const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px;
  width: 50%;
  background-image: linear-gradient(90deg, #0069c0 0%, #0cbccc 100%);
  @media (max-width: 500px) {
    padding: 0px;
    width: 100%;
    background-image: linear-gradient(360deg, #0069c0 0%, #0cbccc 100%);
  }
`;
const Title = styled.h1`
  text-align: flex-start;
  text-shadow: 3px 4px 1px gray;
  @media (max-width: 500px) {
    font-size: 16px;
    text-align: center;
  }
`;
const FormAdd = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (max-width: 500px) {
    justify-content: center;
    align-items: center;
  }
`;
const InputEmail = styled.input`
  color: black;
  padding: 12px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #ff368f;
  @media (max-width: 500px) {
    font-size: 12px;
    min-width: 100px;
    width: 85%;
  }
  @media (max-width: 300px) {
    width: 80%;
    display: flex;
    align-self: center;
  }
`;
const InputName = styled.input`
  padding: 12px;
  color: black;
  background-color: white;
  border: 1px solid #ff368f;
  border-radius: 20px;
  @media (max-width: 500px) {
    font-size: 12px;
    min-width: 100px;
    width: 85%;
  }
  @media (max-width: 300px) {
    width: 80%;
    display: flex;
    align-self: center;
  }
`;
const InputLastName = styled.input`
  padding: 12px;
  color: black;
  background-color: white;
  border: 1px solid #ff368f;
  border-radius: 20px;
  @media (max-width: 500px) {
    font-size: 12px;
    width: 85%;
    min-width: 100px;
  }
  @media (max-width: 300px) {
    width: 80%;
    display: flex;
    align-self: center;
  }
`;
const FormButton = styled.button`
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
    width: 75px;
  }
`;
const ErrorMessage = styled.span`
  color: red;
  padding-left: 15px;
  font-size: 16px;
  font-weight: bold;
`;
const Placeholder = styled.span`
  display: flex;
  color: lightgray;
  text-align: flex-start;
  padding-top: 0;
  margin-top: -5px;
  margin-bottom: -10px;
  padding-left: 10px;
  font-size: 14px;
`;
const AddUser = ({ recipients }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({ email: null, name: null, lastName: null });
  const dispatch = useDispatch();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const onSubmit = (e, email, name, lastName) => {
    e.preventDefault();
    dispatch(AddRecipient({ email, name, lastName }));
  };
  console.log(errors, "el error del email");
  return (
    <Container>
      <Title>Add user to the recipients list</Title>
      <FormAdd onSubmit={(e) => onSubmit(e, email, name, lastName)}>
        <Placeholder>Required</Placeholder>
        <InputEmail
          onBlur={() => ValidateEmail(email, errors, setErrors)}
          onChange={handleEmail}
          value={email}
          required={true}
          placeholder="Email"
        ></InputEmail>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <InputName
          onBlur={() => ValidateName(name, errors, setErrors)}
          onChange={handleName}
          value={name}
          placeholder="Recipient's name"
        ></InputName>
        <Placeholder>Optional, if not provided the user will not receive emails with his name</Placeholder>
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <InputLastName
          onChange={handleLastName}
          onBlur={() => ValidateName(lastName, errors, setErrors)}
          value={lastName}
          placeholder="Recipient's last name"
        ></InputLastName>
        <Placeholder>Optional</Placeholder>
        {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
        <FormButton type="submit">Add</FormButton>
      </FormAdd>
      <Schedules recipients={recipients} />
    </Container>
  );
};

export default AddUser;
