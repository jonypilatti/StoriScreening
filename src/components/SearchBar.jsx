import styled from "styled-components";

const Input = styled.input`
  display: flex;
  align-self: flex-start;
  border-radius: 20px;
  border: 2px solid lightgray;
  padding: 12px;
  color: black;
  font-size: 14px;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  font-size: 14px;
  line-height: 14px;
  outline: none;
  background-color: #f6f7f8;
  @media (max-width: 300px) {
    align-self: center;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
  }
  &:hover {
    border: 2px solid lightblue;
  }
`;
const Container = styled.div`
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;

  width: 100%;
  @media (max-width: 500px) {
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 90%;
  }
`;

const SearchBar = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Input value={search} onChange={handleChange} placeholder="Search a recipient..."></Input>
    </Container>
  );
};

export default SearchBar;
