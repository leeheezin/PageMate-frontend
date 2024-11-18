import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CarouselSwiper from "./CarouselSwiper";
import { fetchBooks } from "../../features/book/bookSlice";
import { AppDispatch } from "../../features/store"; // AppDispatch 타입 임포트
import "./postSearch.style.css"
interface PostSearchProps {
  onSearch: (query: string) => void; // 검색어를 상위 컴포넌트로 전달
}

const PostSearch: React.FC<PostSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  // Redux 상태에서 books 데이터를 가져옵니다.
  const dispatch = useDispatch<AppDispatch>();  // dispatch 타입 지정
  const { books, loading, error } = useSelector((state: any) => state.books);

  // 베스트셀러 데이터를 가져오기 위해 useEffect 수정
  useEffect(() => {
    if (books.length === 0) { // books가 비어있다면 fetchBooks를 호출하여 데이터를 가져옵니다.
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query); // 검색어 전달
  };

  return (
    <>
      <div className="search-box">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="search"
            className="search-input"
            placeholder="도서 제목 검색"
            value={query}
            onChange={handleInputChange}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <button type="submit" className="search-button">
            검색
          </button>
        </form>
      </div>


      <div className="popular-books-container">
        {/* '오늘의 인기 도서' 영역 */}
        <div className="today-popular">
          <p>
            오늘의<br />
            인기<br />
            도서
          </p>
        </div>
        {/* Carousel */}
        <CarouselSwiper />
      </div>


    </>
  );
};

export default PostSearch;
