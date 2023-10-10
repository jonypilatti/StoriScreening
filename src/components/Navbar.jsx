import React from "react";
import styled, { keyframes } from "styled-components";
import SearchBar from "./SearchBar";
import NewstoriLogo from "../assets/images/newstori_logo.png";
import { useSelector } from "react-redux";

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
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
`;

const NavButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  margin-right: 50px;
`;
const BrandingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Logo = styled.img`
  display: flex;
  width: 50px;
  margin-left: 50px;
  background-color: red;
`;
const glowAnimation = keyframes`
0%,to{
    color:#e9baf9;
    text-shadow:1px 1px 2px green;
}
10%,90%{
    color:pink;
    text-shadow: 1px 1px 2px pink;
}
`;
const BrandLetter = styled.span`
  font-size: 32px;
  text-align: center;
  color: black;
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
const Navbar = () => {
  const BrandTitle = Array.from("NEWStori");
  const role = useSelector((state) => state.user.user.role);
  const token = useSelector((state) => state.user.user.token);

  return (
    <Nav>
      <BrandingContainer>
        <Logo src={NewstoriLogo}></Logo>
        <Brand>
          {BrandTitle.map((el, index) => (
            <BrandLetter key={index} style={{ animationDelay: `${index * 0.25}s` }}>
              {el}
            </BrandLetter>
          ))}
        </Brand>
      </BrandingContainer>
      <SearchBar />
      <NavButtonsContainer>
        <ButtonNav>News</ButtonNav>
        {!token && <ButtonNav>Log In</ButtonNav>}
        {token && <ButtonNav>Log Out</ButtonNav>}
        {!token && <ButtonNav>Sign up</ButtonNav>}
        {token && role === "admin" && <ButtonNav>Admin Panel</ButtonNav>}
      </NavButtonsContainer>
    </Nav>
  );
};

export default Navbar;
