import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import Recipients from "../components/NewsletterForm";
import Schedules from "../components/Schedules";
import UploadPanel from "../components/UploadPanel";
import AddUser from "../components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailsSent, fetchNewsletters, fetchRecipients } from "../redux/recipientsSlice";
import ManageRecipients from "../components/ManageRecipients";
const Container = styled.div`
  padding: 0;
`;
const ListsContainer = styled.section`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Admin = () => {
  const dispatch = useDispatch();
  const recipients = useSelector((state) => state.data.recipients);
  const emails = useSelector((state) => state.data.emailsSent);
  const newsletters = useSelector((state) => state.data.newsletters);
  console.log(recipients, "el padre", newsletters, "las newsletters", emails, "los emails");

  useEffect(() => {
    dispatch(fetchRecipients());
    dispatch(fetchEmailsSent());
    dispatch(fetchNewsletters());
  }, []);
  return (
    <Container>
      <Navbar />
      <ListsContainer>
        <AddUser recipients={recipients} />
        <Recipients recipients={recipients} />
      </ListsContainer>
      <Dashboard recipients={recipients} emailsSent={emails} newsletters={newsletters} />
    </Container>
  );
};

export default Admin;
