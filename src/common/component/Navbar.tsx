import React from 'react';
import { useNavigate } from "react-router-dom";
import iconLogo from '../../assets/images/icon-logo1.png';
import iconLogoBig from '../../assets/images/icon-logo1_big.png';
import iconMenu from '../../assets/images/icon-menu_black.png';
import iconSearch from '../../assets/images/icon-search_black.png';
import '../style/common.style.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

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
          <button className="mobile-navbar-icon me-1" onClick={() => navigate("/search")}>
            <img src={iconSearch} alt="Search" />
          </button>
          {/* 햄버거 메뉴 아이콘 */}
          <button className="mobile-navbar-icon me-3">
            <img src={iconMenu} alt="Menu" />
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar;