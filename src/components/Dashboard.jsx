import React from "react";
import styled from "styled-components";
const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  padding: 10px;
`;
const Title = styled.h1`
  text-align: flex-start;
  background: linear-gradient(180deg, #006497, #05caca);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const Statistics = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-self: center;
  align-items: flex-start;
  flex-direction: column;
  width: 90%;
  color: black;
  gap: 10px;
  list-style-type: none;
  padding: 0;
  margin-left: 0;
`;
const Statistic = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-right: 0;
  margin-left: 0;
  background-image: linear-gradient(90deg, #0cbccc 0%, #0069c0 100%);
`;
const Card = styled.article`
  display: flex;
  background-color: lightblue;
  border-radius: 16px;
  padding: 20px;
  margin: 15px;
`;

const Dashboard = ({ recipients, emailsSent, newsletters }) => {
  //1ero sera emails sent
  //2do sera recipients
  //3ero sera newsletters
  const stats = [recipients, emailsSent, newsletters];
  const maxValue = Math.max(...stats.map((el) => el.length));
  return (
    <Container>
      <Title>Dashboard</Title>
      <Card>
        <Statistics>
          {stats.map((el, index) => (
            <Statistic key={index} style={{ display: "flex", width: (el.length / maxValue) * 100 + "%" }}>
              <span style={{ fontWeight: "bold", width: "100%", fontSize: "18px" }}>
                {index === 0 ? "Recipients:" : index === 1 ? "Emails sent:" : "Newsletters"}
              </span>
              <span style={{ width: "100px", fontWeight: "bold" }}>Total: {el.length}</span>
            </Statistic>
          ))}
        </Statistics>
      </Card>
    </Container>
  );
};

export default Dashboard;
