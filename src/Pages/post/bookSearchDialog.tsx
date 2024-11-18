import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../features/store";
import "./component/booSearchDialog.style.css";
import { fetchBooks, clearBooks } from "../../features/bookSearch/bookSearchSlice";

interface BookSearchDialogProps {
    onClose: () => void; // onClose prop 타입 추가
    onSelect: (bookTitle: string, bookAuthor: string) => void; // onSelect prop 타입 추가
}

const BookSearchDialog: React.FC<BookSearchDialogProps> = ({ onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { books, loading, error } = useSelector((state: any) => state.bookSearch);

    const handleSearch = () => {
        if (searchTerm.trim() === "") return;
        dispatch(fetchBooks(searchTerm));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleSelectBook = (bookTitle: string, bookAuthor: string[]) => {
        const formatAuthor = bookAuthor && bookAuthor.length > 0 ? bookAuthor.join(", ") : "저자 정보 없음"; 
        onSelect(bookTitle, formatAuthor);
        console.log(formatAuthor)
        onClose(); // 선택 후 다이얼로그 닫기
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    console.log(books)
    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                {/* 검색창 */}
                <div className="search-header">
                    <input
                        type="text"
                        placeholder="책 제목을 입력하세요"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={onClose} className="dialog-close-btn">
                        ✕
                    </button>
                </div>

                {/* 검색 결과 */}
                {loading ? (
                    <p>검색 중...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <ul>
                        {books.map((book: any) => (
                            <li key={book.id} onClick={() => handleSelectBook(book.title, book.authors)}>
                                <img src={book.thumbnail} alt={book.title} />
                                <div>
                                    <span className="book-title">{book.title}</span>
                                    <span className="book-author">
                                    {book.authors && book.authors.length > 0 ? book.authors.join(", ") : "저자 정보 없음"} 지음
                                    </span>
                                    <span className="book-publisher">
                                        {book.publisher ? book.publisher : "출판사 정보 없음"} 펴냄
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BookSearchDialog;
