import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
`;
const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
  background-color: red;
`;

const ButtonNav = styled.button`
  display: flex;
  width: 100px;
  height: 50px;
  border-radius: 12px;
  align-items: center;
  text-align: center;
`;

const NavButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
`;
const Logo = styled.img``;
export default function Root() {
  return (
    <Container>
      <Nav>
        <Logo></Logo>
        <NavButtonsContainer>
          <ButtonNav>News</ButtonNav>
          <ButtonNav>Log In</ButtonNav>
          <ButtonNav>Register</ButtonNav>
          <ButtonNav>Admin Panel</ButtonNav>
        </NavButtonsContainer>
      </Nav>
    </Container>
  );
}
