import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import NewstoriLogo from "../assets/images/newstori_logo.png";
import { useDispatch, useSelector } from "react-redux";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

const Nav = styled.nav`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: white;
  border-right: 0;
`;

const BrandingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  cursor: pointer;

  @media (max-width: 500px) {
    padding: 15px;
  }
`;
const Logo = styled.img`
  display: flex;
  width: 50px;
  background-color: red;
  @media (max-width: 500px) {
    margin-left: 0px;
  }
`;
const glowAnimation = keyframes`
0%,to{
    color:#e9baf9;
    text-shadow:1px 1px 2px yellow;
}
10%,90%{
    color:pink;
    text-shadow: 1px 1px 2px red;
}
`;
const BrandLetter = styled.span`
  font-size: 32px;
  text-align: center;
  color: transparent;
  animation: ${glowAnimation} 2s ease-in-out infinite;
  pointer-events: none;
`;
const Brand = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ButtonNav = styled.button`
  display: flex;
  background-color: white;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100px;
  height: 45px;
  background-color: #ff0080;
  border: 1px solid;
  border-radius: 24px;
  &:hover {
    border: 1px solid lightblue;
    color: lightblue;
  }
  &:focus {
    border: transparent;
    decoration: none;
  }
  @media (max-width: 550px) {
    width: 50px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-center: flex-end;
`;
const Navbar = () => {
  const BrandTitle = Array.from("NEWStori");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/login");
  };
  return (
    <Nav>
      <BrandingContainer onClick={() => navigate("/")}>
        <Logo src={NewstoriLogo}></Logo>
        <Brand>
          {BrandTitle.map((el, index) => (
            <BrandLetter key={index} style={{ animationDelay: `${index * 0.25}s` }}>
              {el}
            </BrandLetter>
          ))}
        </Brand>
      </BrandingContainer>
      <ButtonContainer>
        {!user && <ButtonNav onClick={() => navigate("/login")}>Log In</ButtonNav>}
        {user && <ButtonNav onClick={() => handleLogout()}>Log Out</ButtonNav>}
        {!user && <ButtonNav onClick={() => navigate("/signup")}>Sign up</ButtonNav>}
        {user && user?.role === "admin" && <ButtonNav onClick={() => navigate("/admin")}>Admin Panel</ButtonNav>}
      </ButtonContainer>
    </Nav>
  );
};

export default Navbar;
