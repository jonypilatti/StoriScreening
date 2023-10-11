import React from "react";
import styled, { keyframes } from "styled-components";
import NewstoriLogo from "../assets/images/newstori_logo.png";

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const BrandingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  @media (max-width: 500px) {
    padding: 15px;
  }
`;
const Logo = styled.img`
  display: flex;
  width: 50px;
  margin-left: 50px;
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
const Navbar = () => {
  const BrandTitle = Array.from("NEWStori");

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
    </Nav>
  );
};

export default Navbar;
