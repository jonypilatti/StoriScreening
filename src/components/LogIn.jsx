import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LogIn } from "../redux/userSlice";
import { ValidateEmail, ValidatePassword } from "../assets/validations/validations";
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
const ErrorText = styled.p`
  color: orange;
  text-align: center
  padding: 15px;
  @media (max-width: 550px) {
    font-size: 16px;
  }
`;
const ContainerInputs = styled.form`
  display: flex;
  flex-direction: column;
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password) dispatch(LogIn({ email, password, navigate }));
    else Swal.fire("Error", "Please enter a valid email and password", "error");
  };
  return (
    <Container>
      <Navbar></Navbar>
      <Title>Log In</Title>
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
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
        <Button type="submit">Login</Button>
      </ContainerInputs>
    </Container>
  );
};

export default Login;
