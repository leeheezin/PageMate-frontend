import React from "react";
import styled from "styled-components";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Message = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #014421;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #01351a;
  }
`;

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, message, onClose }) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default AlertModal;
