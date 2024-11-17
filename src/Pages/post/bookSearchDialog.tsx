import React from 'react';
import "./component/booSearchDialog.style.css";

interface BookSearchDialogProps {
    onClose: () => void; // onClose prop 타입 추가
}

const BookSearchDialog: React.FC<BookSearchDialogProps> = ({ onClose }) => {

    // 배경 클릭 시 닫기 이벤트 처리
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose(); // 배경 클릭 시 다이얼로그 닫기
        }
    };

    const books = [
        { id: 1, title: "소년이 온다", author: "한강", cover: "https://via.placeholder.com/50x75" },
        { id: 2, title: "소년이 온다 특별판", author: "한강", cover: "https://via.placeholder.com/50x75" },
        { id: 3, title: "소년이 온다", author: "한강", cover: "https://via.placeholder.com/50x75" },
        { id: 4, title: "소년이 온다 특별판", author: "한강", cover: "https://via.placeholder.com/50x75" },
    ];

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                
                {/* 검색창 */}
                <div className="search-header">
                    <input
                        type="text"
                        placeholder="책 제목을 입력하세요"
                        className="search-input"
                    />
                    {/* 닫기 버튼 */}
                    <button onClick={onClose} className="dialog-close-btn">
                        ✕
                    </button>
                </div>

                {/* 책 리스트 */}
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <img src={book.cover} alt={book.title} />
                            <div>
                                <span className="book-title">{book.title}</span>
                                <span className="book-author">{book.author}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BookSearchDialog;