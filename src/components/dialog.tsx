import React, { ReactNode } from "react";
import styled from "styled-components";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    position?: "fixed" | "absolute";
    top?: string;
}
const Overlay = styled.div<{ isOpen: boolean; position: string; top: string }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: ${({ position }) => position};
  top: ${({ top }) => top || "0"};
  right: 0;
  bottom: 0;
  left: 0; /* 추가: 전체 화면을 덮도록 설정 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  background-color: rgba(0, 0, 0, 0); /* 배경 어두운 효과 */
  z-index: 10000;

  @media (max-width: 480px) {
    top: ${({ top }) => top || "0"};
    right: 0;
  }
`;

const DialogContainer = styled.div`
    background: #fff;
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: relative;
    z-index: 1001;
    @media (max-width: 480px) {
        width: 130px;
    }
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


const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children, position="fixed", top="" }) => {
    return (
        <Overlay isOpen={isOpen} onClick={onClose} position={position} top={top}>
            <DialogContainer onClick={(e) => e.stopPropagation()}>
                <Content>{children}</Content>
                <CloseButton onClick={onClose}>취소</CloseButton>
            </DialogContainer>
        </Overlay>
    );
};

export default Dialog;
