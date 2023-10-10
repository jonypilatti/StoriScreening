import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  display: flex;
  align-self: center;
  border-radius: 20px;
  border: 1px solid lightgray;
  padding: 12px;
  color: black;
  font-size: 14px;

  width: 70%;
  -webkit-appearance: none;
  appearance: none;
  font-size: 14px;
  line-height: 14px;
  margin-right: 16px;
  outline: none;
  background-color: #f6f7f8;
  &:hover {
    border: 2px solid lightblue;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Input value={search} onChange={handleChange} placeholder="Search your post..."></Input>
    </Container>
  );
};

export default SearchBar;
