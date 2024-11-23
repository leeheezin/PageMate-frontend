import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch,RootState } from "../../features/store";
import { fetchPosts } from "../../features/post/postsSlice";
import { logout } from "../../features/user/userSlice";
import ConfirmDialog from "../../components/comfirmDialog";
import iconLogo from '../../assets/images/icon-logo1.png';
import iconLogoBig from '../../assets/images/icon-logo1_big.png';
import iconMenu from '../../assets/images/icon-menu_black.png';
import iconLogin from '../../assets/images/icon-login_black.png';
import iconLogout from '../../assets/images/icon-logout_black.png';
import iconSearch from '../../assets/images/icon-search_black.png';
import iconClose from '../../assets/images/icon-close.png';
import iconBack from '../../assets/images/icon-back.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../style/common.style.css';
// import '../../Pages/search/postSearch.style.css';
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보 가져오기
  const dispatch = useDispatch<AppDispatch>();  // dispatch 타입 지정

  // 검색 UI 상태 관리
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const handleSearchClick = () => {
    setIsSearching(true); // 검색 UI 표시
  };

  const handleSearchCloseClick = () => {
    // console.log('query', query)
    if(!query) {
      setIsSearching(false); // 검색 UI 숨기기
      if (location.search.includes("?bookTitle")) {
        navigate("/search"); // search 페이지로 이동
        // window.location.reload(); // 강제로 페이지 새로고침
      }
    }else{
      setQuery("")
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // 검색어 입력 상태 업데이트
  };

  const handleSearchSubmit = async() => {
    if (query.trim()) {
      navigate(`/search?bookTitle=${encodeURIComponent(query)}`); // 검색어를 URL로 전달
      await dispatch(fetchPosts({ bookTitle: query }));
    }
  };

  // 엔터 키로 검색을 제출하는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(); // 엔터 키를 누르면 검색어 제출
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsConfirmOpen(false); 
  };

  // URL이 `/`일 때 검색 UI 닫기
  useEffect(() => {
    if (location.pathname === "/") {
      setIsSearching(false); 
    }
  }, [location.pathname]); // URL 변경 시 감지
  return (
    <>
      {/* desktop 상단 navbar */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleLogout}
      >
        로그아웃 하시겠습니까?
      </ConfirmDialog>
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
          <img src={iconLogo} alt="Logo" className='mobile-navbar-logo' />
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
            {user && <img src={iconLogin} alt="Login" className="img-sizeup" onClick={() => setIsConfirmOpen(true)} />}
            {!user && <img src={iconLogout} alt="Logout" className="img-sizeup" onClick={() => navigate('/login')} />}
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
            <div className='search-input-area'>

              {/* 검색 입력 박스 */}
              <input
                type="text"
                placeholder="도서 제목으로 리뷰 검색"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}  // 엔터 키 감지
                className="nav-search-input"
              />
              {/* 검색 아이콘 */}
              <FontAwesomeIcon icon={faSearch} className="nav-search-icon" />
              
              {/* 닫기 아이콘 */}
              <button onClick={handleSearchCloseClick} className="nav-icon">
                <img src={iconClose} alt="Close" />
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar;