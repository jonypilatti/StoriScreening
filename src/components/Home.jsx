import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  justify-content: center;
`;
const NewsContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const NewsTitle = styled.h2`
  color: white;
  text-align: center;
`;
const NewsImage = styled.image`
  width: 50%;
`;
const NewsContent = styled.p`
  color: white;
  justify-content: center;
  text-align: center;
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
const Home = () => {
  const handleAdmin = () => {
    const user = localStorage.getItem("user");
    localStorage.setItem("user", JSON.stringify({ ...user, role: "admin" }));
    window.location.reload();
  };
  return (
    <Container>
      <NewsContainer>
        <NewsTitle>Here I would render most of the newsletters and allow the user to subscribe each of them.</NewsTitle>
        <NewsContent>
          For screening purposes, most of the work was made in the admin panel, thus you can make yourself temporarily
          an admin user by clicking the button below and accesing the panel at /admin or the button in the navbar. For
          this purpose, admin routes are not protected
        </NewsContent>
        <Button onClick={(e) => handleAdmin(e)}>Make yourself admin user</Button>
      </NewsContainer>
    </Container>
  );
};

export default Home;
