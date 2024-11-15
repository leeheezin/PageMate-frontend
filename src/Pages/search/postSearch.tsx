import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CarouselSwiper from "../../common/component/CarouselSwiper"
import "./postSearch.style.css"
interface PostSearchProps {
  onSearch: (query: string) => void; // 검색어를 상위 컴포넌트로 전달
}

const PostSearch: React.FC<PostSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query); // 검색어 전달
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="search"
          placeholder="도서 제목 검색"
          value={query}
          onChange={handleInputChange}
          style={{
            padding: "10px 10px 10px 30px", // 아이콘과 간격 확보
            fontSize: "16px",
            border: "1px solid var(--main-color)",
            borderRadius: "5px",
            width: "250px",
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: "absolute",
            left: "10px", // 입력 필드 내부 위치 조정
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--main-color)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          검색
        </button>
      </form>
      <div className="carousel">
        <h1>메인 팝업 슬라이드</h1>
        <CarouselSwiper />
      </div>
    </>
  );
};

export default PostSearch;
