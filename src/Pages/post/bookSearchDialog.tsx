import React from 'react';
import "./post.style.css";

interface BookSearchDialogProps {
    onClose: () => void; // onClose prop 타입 추가
}

const BookSearchDialog: React.FC<BookSearchDialogProps> = ({ onClose }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog-content">
                <button onClick={onClose}>닫기</button>
                {/* 책 검색 기능 및 결과 표시 */}
                <h2>책 검색</h2>
                {/* 검색 결과 예시 */}
                <ul>
                    <li>책 제목 1</li>
                    <li>책 제목 2</li>
                    <li>책 제목 3</li>
                </ul>
            </div>
        </div>
    );
};

export default BookSearchDialog;