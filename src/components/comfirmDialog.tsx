import React, { ReactNode } from "react";
import styled from "styled-components";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  position?: "fixed" | "absolute";
  top?: string;
  left?: string;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const DialogContainer = styled.div<{ top: string; left: string }>`
  background: #fff;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 10001;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  background-color: #014421; /* 확인 버튼 배경색 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #003300;
  }
`;

const CancelButton = styled.button`
  background-color: #9e1515; /* 취소 버튼 배경색 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #790707;
  }
`;

const Content = styled.div`
  font-size: 16px;
  color: #333;
`;

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  top = "50%",
  left = "50%",
}) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <DialogContainer
        onClick={(e) => e.stopPropagation()}
        top={top}
        left={left}
      >
        <Content>{children}</Content>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </DialogContainer>
    </Overlay>
  );
};

export default ConfirmDialog;
