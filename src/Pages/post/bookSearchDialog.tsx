import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import "./component/bookSearchDialog.style.css";
import "./component/bestSellerList.style.css";
import { fetchBookSearchResult, clearBooks } from "../../features/bookSearch/bookSearchSlice";
import { fetchBooks } from "../../features/book/bookSlice";
import NoResult from "../../components/noresultPage";
interface BookSearchDialogProps {
    onClose: () => void;
    onSelect: (bookTitle: string, bookAuthor: string) => void;
}

const BookSearchDialog: React.FC<BookSearchDialogProps> = ({ onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [fixedSearchTerm, setFixedSearchTerm] = useState<string | null>(null); // 고정된 검색 값
    const [hasSearched, setHasSearched] = useState(false); // 검색 여부 추가
//     const observer = useRef<IntersectionObserver | null>(null); // Intersection Observer 레퍼런스
    const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조
    const dispatch = useDispatch<AppDispatch>();
    const { books, loading, error, page, hasMore } = useSelector((state: any) => state.bookSearch);
    const { books: books2 } = useSelector((state: RootState) => state.book);

    // 베스트셀러 데이터 로드
    useEffect(() => {
        if (books2.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, books2.length]);

    // 초기 검색 상태 초기화
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTop = 0; // 검색 초기화 시 스크롤 맨 위로 이동
        }
    }, [hasSearched]);

    const loadMore = () => {
        if (!searchTerm.trim() || !hasMore || loading) return;
        dispatch(fetchBookSearchResult({ query: searchTerm, page: page + 1 }));
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container || loading || !hasMore) return;

        // 스크롤이 끝에 도달했는지 확인
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
            loadMore();
        }
    };

    const handleSearch = (term: string) => {
        setHasSearched(true); // 검색 수행 여부 업데이트
        dispatch(clearBooks());
        dispatch(fetchBookSearchResult({query: term, page: 1}));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
          e.preventDefault();
          setFixedSearchTerm(searchTerm); // 검색어를 고정
          handleSearch(searchTerm); // 검색 실행

        }
    };

    const handleSelectBook = (bookTitle: string, bookAuthor: string[]) => {
        const formatAuthor = bookAuthor.length > 0 ? bookAuthor.join(", ") : "저자 정보 없음";
        onSelect(bookTitle, formatAuthor);
        handleClose();
    };

    const handleClose = () => {
        dispatch(clearBooks());
        setSearchTerm("");
        setHasSearched(false);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const covers = books2.map((book) => book.cover);

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div
                className="dialog-content"
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
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
                {loading && !books.length ? (
                    <p>검색 중...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : hasSearched && books.length === 0 ? (
                    // <p>검색 결과가 없습니다.</p>
                    <NoResult bookTitle={fixedSearchTerm}/>
                ) : (
                    <ul>
                        {books.map((book: any, index: number) => (
                            <li
                                key={`${book.title}-${index}`}
                                onClick={() => handleSelectBook(book.title, book.authors)}
                            >
                                <img src={book.thumbnail} alt={book.title} />
                                <div>
                                    <span className="book-title">{book.title}</span>
                                    <span className="book-author">
                                        {book.authors.length > 0 ? book.authors.join(", ") : "저자 정보 없음"} 지음
                                    </span>
                                    <span className="book-publisher">
                                        {book.publisher || "출판사 정보 없음"} 펴냄
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {loading && hasSearched && <p>로딩 중...</p>}
                {!hasSearched && (
                    <div className="popular-books-grid">
                        <h2 className="popular-books-title">오늘의 인기 도서</h2>
                        <div className="grid-container">
                            {covers.map((src, index) => (
                                <div className="book-card" key={index}>
                                    <img
                                        src={src || "/path/to/default/cover.jpg"}
                                        alt={`Book ${index + 1}`}
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
