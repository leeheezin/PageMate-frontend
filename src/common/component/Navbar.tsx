import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import iconLogo from '../../assets/images/icon-logo1.png';
import iconLogoBig from '../../assets/images/icon-logo1_big.png';
import iconMenu from '../../assets/images/icon-menu_black.png';
import iconSearch from '../../assets/images/icon-search_black.png';
import iconClose from '../../assets/images/icon-close.png';
import iconBack from '../../assets/images/icon-back.png'
import '../style/common.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import '../../Pages/search/postSearch.style.css';
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // 검색 UI 상태 관리
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    setIsSearching(true); // 검색 UI 표시
  };

  const handleSearchCloseClick = () => {
    setIsSearching(false); // 검색 UI 숨기기
    navigate("/search"); // search 페이지로 이동
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // 검색어 입력 상태 업데이트
  };
  return (
    <>
      {/* desktop 상단 navbar */}
      <nav className="desktop-navbar">
        {/* 왼쪽 로고 아이콘 */}
        <button className="navbar-icon ms-3" onClick={() => navigate("/")}>
          <img src={iconLogoBig} alt="Logo" />
        </button>
        {/* 중앙 텍스트 */}
        <div className="navbar-title fontup" onClick={() => navigate("/")}>PageMate</div>
      </nav>

      {/* mobile 상단 navbar */}
      <nav className="mobile-navbar">
        {/* 왼쪽 로고 아이콘 */}
        <button className="mobile-navbar-icon ms-3" onClick={() => navigate("/")}>
          <img src={iconLogo} alt="Logo" />
        </button>
        
        {/* 중앙 텍스트 */}
        <div className="navbar-title" onClick={() => navigate("/")}>PageMate</div>

        {/* 오른쪽 아이콘들 */}
        <div className="navbar-right">
          {/* 검색 아이콘 */}
          <button className="mobile-navbar-icon me-1" 
            onClick={handleSearchClick}>
            <img src={iconSearch} alt="Search" />
          </button>
          {/* 햄버거 메뉴 아이콘 */}
          <button className="mobile-navbar-icon me-3">
            <img src={iconMenu} alt="Menu" />
          </button>
        </div>
      </nav>

      {/* 검색 UI */}
      {isSearching && (
        <div className="search-ui">
          <div className="search-input-box">
            {/* 뒤로가기 아이콘 */}
            <button onClick={handleSearchCloseClick}>
              <img src={iconBack} alt="Back" className="navbar-back-icon" />
            </button>

            {/* 검색 입력 박스 */}
            <input
              type="text"
              placeholder="도서 제목으로 리뷰 검색"
              value={query}
              onChange={handleInputChange}
              className="nav-search-input"
            />
            {/* 검색 아이콘 */}
            <FontAwesomeIcon icon={faSearch} className="nav-search-icon" />

            {/* <div className="search-box">
              <form onSubmit={handleSubmit} className="search-form">
                <input
                  type="search"
                  className="searchPage-search-input"
                  placeholder="도서 제목으로 리뷰 검색"
                  value={query}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </form>
            </div> */}
            
            {/* 닫기 아이콘 */}
            <button onClick={handleSearchCloseClick} className="nav-icon">
              <img src={iconClose} alt="Close" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar;