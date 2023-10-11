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
  const array50 = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
  const array200 = Array.from({ length: 200 }, () => Math.floor(Math.random() * 100));
  const array500 = Array.from({ length: 500 }, () => Math.floor(Math.random() * 100));
  //1ero sera emails sent
  //2do sera recipients
  //3ero sera newsletters
  console.log(recipients, "los recipients del componente");
  const stats = [recipients, emailsSent, newsletters];
  const maxLength = stats.reduce((max, el) => {
    return el.length > max.length ? el : max;
  }, stats[0])?.length;
  console.log((500 / maxLength) * 100 + "%", "el length");
  return (
    <Container>
      <Title>Dashboard</Title>
      <Card>
        <Statistics>
          {stats.map((el, index) => (
            <Statistic key={index} style={{ display: "flex", width: (el.length / maxLength) * 100 + "%" }}>
              <span style={{ fontWeight: "bold", width: "100%", width: "100px", fontSize: "18px" }}>
                {index === 0 ? "Recipients:" : index === 1 ? "Emails sent:" : "Newsletters"}
              </span>
              <span style={{ width: "100px", fontWeight: "bold" }}>Total: {el.length}</span>
              <span style={{ width: "100px" }}>{el?.length * 100}% </span>
            </Statistic>
          ))}
        </Statistics>
      </Card>
    </Container>
  );
};

export default Dashboard;
