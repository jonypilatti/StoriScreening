import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Container = styled.section`
  display: flex;
  width: 50%;
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
  text-align: left;
`;
const NewsImage = styled.image`
  width: 50%;
`;
const NewsContent = styled.p`
  color: white;
  justify-content: center;
  text-align: left;
`;
const News = () => {
  const news = useSelector((state) => state.news.news);
  console.log(news, "las news");
  return (
    <Container>
      {news.map((el, index) => (
        <NewsContainer key={index}>
          <NewsTitle>{el.title}</NewsTitle>
          <NewsImage src={el.image}></NewsImage>
          <NewsContent>{el.content}</NewsContent>
        </NewsContainer>
      ))}
    </Container>
  );
};

export default News;
