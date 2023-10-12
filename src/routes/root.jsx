import styled from "styled-components";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserToken } from "../redux/userSlice";
// import jwt_decode from "jsonwebtoken";

const Container = styled.div`
  min-height: 100vh;
  padding: 0px;
  margin: 0px;
`;

export default function Root() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user, "el token del local storage");
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);
  return (
    <Container>
      <Navbar />
      <Home />
    </Container>
  );
}
