import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import "./component/bookSearchDialog.style.css";
import "./component/bestSellerList.style.css";
import { fetchBookSearchResult, clearBooks } from "../../features/bookSearch/bookSearchSlice";
import { fetchBooks } from "../../features/book/bookSlice";

interface BookSearchDialogProps {
    onClose: () => void; // onClose prop 타입 추가
    onSelect: (bookTitle: string, bookAuthor: string) => void; // onSelect prop 타입 추가
}

const BookSearchDialog: React.FC<BookSearchDialogProps> = ({ onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [hasSearched, setHasSearched] = useState(false); // 검색 여부 추가
    const observer = useRef<IntersectionObserver | null>(null); // Intersection Observer 레퍼런스
    const dispatch = useDispatch<AppDispatch>();
    const { books, loading, error, page, hasMore } = useSelector((state: any) => state.bookSearch);
    const { books: books2, loading: loading2, error: error2 } = useSelector((state: RootState) => state.book);

    // 베스트셀러 데이터를 가져오기 위해 useEffect 수정
    useEffect(() => {
        if (books2.length === 0) { // books가 비어있다면 fetchBooks를 호출하여 데이터를 가져옵니다.
        dispatch(fetchBooks());
        }
    }, [dispatch, books2.length]);

    const loadMore = useCallback(() => {
        if (!searchTerm.trim() || !hasMore || loading) return; // 중복 호출 방지
        
        console.log("현재 페이지:", page); // 디버깅: 현재 페이지 값 확인
        dispatch(fetchBookSearchResult({ query: searchTerm, page: page + 1 }));
        
    }, [dispatch, searchTerm, page, hasMore, loading]);

    const lastBookRef = useCallback(
        (node: HTMLLIElement) => {
            if (loading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 작동 안 함
            if (observer.current) observer.current.disconnect(); // 기존 Observer 해제
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, loadMore]
    );

    const handleSearch = () => {
        if (searchTerm.trim() === "") return;
        setHasSearched(true); // 검색 수행 여부 업데이트
        dispatch(fetchBookSearchResult({query: searchTerm, page: 1}));
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
        handleClose(); // 선택 후 다이얼로그 닫기
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        dispatch(clearBooks()); // Redux 상태 초기화
        setSearchTerm(""); // 검색어 초기화
        setHasSearched(false); // 검색 수행 여부 초기화
        onClose(); // 다이얼로그 닫기 콜백 호출
    };

    // books에서 cover만 추출하여 CarouselSwiper로 전달
    const covers = books2.map((book) => book.cover);
    console.log('covers', covers)
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
                    <button onClick={handleClose} className="dialog-close-btn">
                        ✕
                    </button>
                </div>

                {/* 검색 결과 */}
                {loading ? (
                    <p>검색 중...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : hasSearched && books.length === 0 ? (
                    <p>검색 결과가 없습니다.</p>
                ) : (
                    <ul>
                        {books.map((book: any, index: number) => (
                            <li 
                                key={book.id} 
                                onClick={() => handleSelectBook(book.title, book.authors)}
                                ref={index === books.length - 1 ? lastBookRef : null} // 마지막 아이템에 ref 추가
                            >
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
                {!hasSearched && (
                <div className="popular-books-grid">
                <h2 className="popular-books-title">오늘의 인기 도서</h2>
                    <div className="grid-container">
                        {covers.map((src, index) => (
                        <div className="book-card" key={index}>
                            <img
                            src={src || '/path/to/default/cover.jpg'} // 기본 이미지 처리
                            alt={`Book ${index + 1}`}
                            className="book-image"
                            />
                        </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default BookSearchDialog;
