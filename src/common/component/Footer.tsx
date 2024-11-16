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
    <div className="sidebar">
      {/* 상단 버튼들 */}
      <div className="top-buttons">
      <button className="icon-button">
        <img onClick={() => navigate("/")}  src={iconHome} alt="Home" />
      </button>
      <button className="icon-button">
        <img onClick={() => navigate("/search")} src={iconSearch} alt="Search" />
      </button>
      <button className="icon-button">
        <img onClick={() => navigate("/post/write")}src={iconPostAdd} alt="Add Post" />
      </button>
      <button className="icon-button">
        <img onClick={() => navigate("/mypage")} src={iconMypage} alt="My Page" />
      </button>
    </div>

    {/* 하단 햄버거 버튼 */}
    <div className="bottom-button">
      <button className="icon-button">
        <img src={iconMenu} alt="Menu"/>
      </button>
    </div>
  </div>  
  )
}

export default Footer;