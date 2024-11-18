import React from 'react';
import { useNavigate } from "react-router-dom";
import iconPostAdd from '../../assets/images/icon-add_white.png';
import iconSearch from '../../assets/images/icon-search_white.png';
import iconHome from '../../assets/images/icon-home_white.png';
import iconMypage from '../../assets/images/icon-mypage_white.png';
import iconMenu from '../../assets/images/icon-menu_white.png';
import '../style/common.style.css';

const Footer: React.FC = () => {
  let navigate = useNavigate();

  return (
    <>
      {/* desktop 사이드바 footer */}
      <div className="sidebar">
      {/* 상단 버튼들 */}
        <div className="top-buttons">
          <button className="icon-button" onClick={() => navigate("/")}>
            <img src={iconHome} alt="Home" />
          </button>
          <button className="icon-button" onClick={() => navigate("/search")}>
            <img src={iconSearch} alt="Search" />
          </button>
          <button className="icon-button" onClick={() => navigate("/post/write")}>
            <img src={iconPostAdd} alt="Add Post" />
          </button>
          <button className="icon-button" onClick={() => navigate("/mypage")}>
            <img src={iconMypage} alt="My Page" />
          </button>
        </div>

        {/* 하단 햄버거 버튼 */}
        <div className="bottom-button">
          <button className="icon-button">
            <img src={iconMenu} alt="Menu" />
          </button>
        </div>
      </div>

      {/* mobile 하단 footer */}
      <div className="mobile-footer">
        <button className="mobile-icon-button" onClick={() => navigate("/")}>
          <img src={iconHome} alt="Home" />
        </button>
        <button className="mobile-icon-button" onClick={() => navigate("/post/write")}>
          <img src={iconPostAdd} alt="Add Post" />
        </button>
        <button className="mobile-icon-button" onClick={() => navigate("/mypage")}>
          <img src={iconMypage} alt="My Page" />
        </button>
      </div>
    </>
  );
};

export default Footer;
