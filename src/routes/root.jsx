import styled from "styled-components";
import Navbar from "../components/Navbar";
import News from "../components/News";

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
`;

export default function Root() {
  return (
    <Container>
      <Navbar />
      <News />
    </Container>
  );
}
