import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/component/Navbar';
import Footer from '../common/component/Footer';
interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Navbar와 Footer를 제외할 경로
  const noLayoutPaths = ['/login', '/signup'];
  const shouldShowLayout = !noLayoutPaths.includes(location.pathname);
  return (
    <div>
      {/* login과 signup을 제외한 페이지 상단에 Navbar 추가 */}
      {shouldShowLayout && <Navbar/>}

      {/* 메인 콘텐츠 영역 */}
      <div style={{marginTop: shouldShowLayout ? '60px' : '0px'}}>  {/*Navbar 높이에 따라 간격 추가*/}
        {children}
      </div>

      {/*login과 signup을 제외한 페이지에 Footer 추가 */}
      {shouldShowLayout && <Footer />}
      </div>
  );
};

export default AppLayout;
