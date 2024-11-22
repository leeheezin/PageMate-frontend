import React, { ReactNode, useState } from "react";
import styled from "styled-components";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
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
  background-color: rgba(0, 0, 0, 0); /* 배경 어두운 효과 */
  justify-content: center; /* 기본적으로 중앙 정렬 */
  align-items: center;
  z-index: 10000;
`;

const DialogContainer = styled.div<{ top: string; left: string }>`
  background: #fff;
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: absolute; /* 버튼 클릭한 위치를 기준으로 배치 */
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  z-index: 10001;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 9px;
  font-size: 14px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
`;

const Content = styled.div`
  font-size: 16px;
  color: #333;
`;

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
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
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </DialogContainer>
    </Overlay>
  );
};

export default Dialog;
