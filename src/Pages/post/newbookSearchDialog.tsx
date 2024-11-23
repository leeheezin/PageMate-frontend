import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import "./component/bookSearchDialog.style.css";
import "./component/bestSellerList.style.css";
import { fetchBookSearchResult, clearBooks } from "../../features/bookSearch/bookSearchSlice";
import { fetchBooks } from "../../features/book/bookSlice";
import NoResult from "../../components/noresultPage";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

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

    // 데이터 필터링
    const isMobile = window.innerWidth <= 480; // 모바일 환경인지 확인
    const filteredBooks = isMobile ? books2.slice(0, 9) : books2; // 모바일에서 9개 제한

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

    const handleSelectBook = (bookTitle: string, bookAuthor: string | string[]) => {
        // bookAuthor가 string이면 배열로 변환, 아니면 그대로 사용
        const formattedAuthor = typeof bookAuthor === "string" ? [bookAuthor] : bookAuthor;
        const formatAuthorText = formattedAuthor.length > 0 ? formattedAuthor.join(", ") : "저자 정보 없음";
        onSelect(bookTitle, formatAuthorText); // 부모 컴포넌트로 전달
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

    const covers = filteredBooks.map((book) => book.cover);

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div
                className="dialog-content"
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {/* 검색창 */}
                <div className="search-header">
                    <div className="search-container">
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
                </div>

                {/* 검색 결과 */}
                {loading && !books.length ? (
                    // <p>검색 중...</p>
                    // 로딩 중일 때 스켈레톤 렌더링
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="book-search-skeleton">
                            <Skeleton width={50} height={75} style={{ marginRight: 15, borderRadius: "5px" }} />
                            <div>
                                <Skeleton width={200} height={16} style={{ marginBottom: 5 }} />
                                <Skeleton width={150} height={14} />
                                <Skeleton width={180} height={14} style={{ marginTop: 4 }} />
                            </div>
                        </div>
                    ))
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : hasSearched && books.length === 0 ? (
                    // <p>검색 결과가 없습니다.</p>
                    <NoResult bookTitle={fixedSearchTerm}/>
                ) : (
                    <div className="book-search-result-list-container">
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
                    </div>
                )}
                {loading && hasSearched && <p>로딩 중...</p>}
                {!hasSearched && (
                    <div className="popular-books-grid">
                        <h2 className="popular-books-title">오늘의 인기 도서</h2>
                        <div className="grid-container">
                            {filteredBooks.map((book, index) => (
                            <div
                                className="book-card"
                                key={index}
                                onClick={() =>
                                    handleSelectBook(book.title, book.author || "저자 정보 없음")
                                } // 책 클릭 시 제목과 저자를 부모로 전달
                            >
                                <img
                                    src={book.cover || "/path/to/default/cover.jpg"}
                                    alt={book.title || `Book ${index + 1}`}
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
