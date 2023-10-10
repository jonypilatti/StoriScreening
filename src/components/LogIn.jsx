import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  /* Your modal container styles */
`;

const ModalContent = styled.div`
  /* Your modal content styles */
`;

const CloseButton = styled.span`
  /* Your close button styles */
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
`;

const LogIn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      <button onClick={toggleModal}>Open Modal</button>
      {isOpen && (
        <ModalContent>
          <CloseButton onClick={toggleModal}>&times;</CloseButton>
          <h2>Login</h2>
          {/* Your login form or content goes here */}
        </ModalContent>
      )}
    </ModalContainer>
  );
};

export default LogIn;
