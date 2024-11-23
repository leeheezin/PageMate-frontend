import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "relative" | "absolute";
  top?: string;
  left?: string;
  right?: string;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  z-index: 10000;
`;

const DialogContainer = styled.div<{ top: string; left: string; right: string;}>`
  background: #fff;
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  padding: 20px;
  position: absolute; 
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
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
  left = "",
  right = "0",
}) => {;
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <DialogContainer
        onClick={(e) => e.stopPropagation()}
        top={top}
        left={left}
        right={right}
      >
        <Content>{children}</Content>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </DialogContainer>
    </Overlay>
  );
};

export default Dialog;
