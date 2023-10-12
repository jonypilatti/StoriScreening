import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LogIn, SignUp } from "../redux/userSlice";
import { ValidateEmail, ValidateLastName, ValidateName, ValidatePassword } from "../assets/validations/validations";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  background-image: linear-gradient(90deg, #0cbccc 0%, #0069c0 100%);
`;
const ContainerInputs = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 20px;
  gap: 10px;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 5px;
  margin-bottom: 45px;
  float: top;
  text-align: center;
  text-shadow: 3px 4px 1px gray;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const Input = styled.input`
  padding: 12px;
  color: black;
  width: 40%;
  margin-bottom: 10px;
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
const Placeholder = styled.span`
  display: flex;
  color: lightgray;
  font-size: 14px;
  margin: 0;
  padding: 0;
`;
const ErrorText = styled.p`
  color: orange;
  margin: 0;
  padding: 0;
  @media (max-width: 550px) {
    font-size: 16px;
  }
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(errors, "lños errors");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password && !errors.name && !errors.lastName)
      dispatch(SignUp({ email, password, navigate }));
    else Swal.fire("Error", "Please enter a valid attributes", "error");
  };
  return (
    <Container>
      <Navbar></Navbar>
      <Title>Sign Up</Title>
      <ContainerInputs onSubmit={handleSubmit}>
        <Input
          onBlur={() => ValidateEmail(email, errors, setErrors)}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <Input
          onBlur={() => ValidatePassword(password, errors, setErrors)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Placeholder>Min 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol</Placeholder>
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <Button type="submit">Sign Up</Button>
      </ContainerInputs>
    </Container>
  );
};

export default Login;
