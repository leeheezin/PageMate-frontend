import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &.cancel {
    background-color: #ccc;
    color: white;
  }

  &.confirm {
    background-color: #014421;
    color: white;
  }
`;

interface NicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [nickname, setNickname] = useState("");

  const handleConfirm = () => {
    onConfirm(nickname);
    setNickname("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>닉네임 변경</ModalHeader>
        <Input
          type="text"
          placeholder="새 닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <ButtonGroup>
          <Button className="cancel" onClick={onClose}>
            취소
          </Button>
          <Button className="confirm" onClick={handleConfirm}>
            변경
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NicknameModal;
