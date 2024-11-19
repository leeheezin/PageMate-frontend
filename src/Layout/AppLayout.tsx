import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../common/component/Navbar";
import Footer from "../common/component/Footer";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { loginWithToken } from "../features/user/userSlice";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      console.log("토큰 로그인!");
      dispatch(loginWithToken());
    }
  }, [dispatch]);

  // Navbar와 Footer를 제외할 경로
  const noLayoutPaths = ["/login", "/signup"];
  const shouldShowLayout = !noLayoutPaths.includes(location.pathname);
  return (
    <div>
      {/* login과 signup을 제외한 페이지 상단에 Navbar 추가 */}
      {shouldShowLayout && <Navbar />}

      {/* 메인 콘텐츠 영역 */}
      <div
        className="main-contents"
        style={{
          marginTop: shouldShowLayout ? "60px" : "0px",
          marginRight: shouldShowLayout ? "60px" : "0px",
        }}
      >
        {" "}
        {/*Navbar 높이에 따라 간격 추가*/}
        {children}
      </div>

      {/*login과 signup을 제외한 페이지에 Footer 추가 */}
      {shouldShowLayout && <Footer />}
    </div>
  );
};

export default AppLayout;
