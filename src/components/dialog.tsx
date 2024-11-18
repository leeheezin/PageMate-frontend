import React, { ReactNode } from "react";
import styled from "styled-components";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
const Overlay = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); 
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 10000;
`;
const DialogContainer = styled.div`
    background: #fff;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: relative;
    z-index: 1001;
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


const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
    return (
        <Overlay isOpen={isOpen} onClick={onClose}>
            <DialogContainer onClick={(e) => e.stopPropagation()}>
                <Content>{children}</Content>
                <CloseButton onClick={onClose}>취소</CloseButton>
            </DialogContainer>
        </Overlay>
    );
};

export default Dialog;
