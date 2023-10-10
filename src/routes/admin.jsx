import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import UserList from "../components/UserList";
import Dashboard from "../components/Dashboard";
import Recipients from "../components/Recipients";
import Schedules from "../components/Schedules";
const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
`;
const ListsContainer = styled.section`
  display: flex;
  flex-direction: row;
`;

const Admin = () => {
  return (
    <Container>
      <Navbar />
      <ListsContainer>
        <UserList />
        <Recipients />
      </ListsContainer>
      <Schedules />
      <Dashboard />
    </Container>
  );
};

export default Admin;
