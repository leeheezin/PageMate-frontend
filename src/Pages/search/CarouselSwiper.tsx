import { useState } from "react";
import prevIcon from "../../assets/images/icon-left.png";
import nextIcon from "../../assets/images/icon-right.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import './CarouselSwiper.style.css';

interface CarouselSwiperProps {
  covers: string[];
}

const CarouselSwiper: React.FC<CarouselSwiperProps> = ({ covers }) => {
  // const images = [
  //   "/images/book1.jpg",
  //   "/images/book2.jpg",
  //   "/images/book3.jpg",
  //   "/images/book4.jpg",
  //   "/images/book5.jpg",
  //   "/images/book6.jpg",
  //   "/images/book7.jpg",
  // ]; // 이미지 배열

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % covers.length); // 다음 인덱스로 이동
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + covers.length) % covers.length // 이전 인덱스로 이동
    );
  };

  // 현재 표시할 4개의 이미지를 계산
  const visibleCover = Array.from({ length: covers.length }, (_, i) =>
    covers[(startIndex + i) % covers.length]
  );

  return (
    <>
    <Swiper
    className="mySwiper"
      slidesPerView={4} // 한 번에 보여줄 슬라이드 수
      centeredSlides={false} // 중앙 정렬 여부
      slidesPerGroupSkip={4} // 그룹 단위로 건너뛸 슬라이드 수
      grabCursor={false} // 마우스 커서 손잡이 여부
      keyboard={{
        enabled: true,
      }}
      breakpoints={{
        769: {
          slidesPerView:4, // 데스크탑 버전에서 한 번에 보여줄 슬라이드 수
          slidesPerGroup:1, // 그룹 단위로 건너뛸 슬라이드 수
        },
      }}
      scrollbar={false} // 스크롤바 여부
      navigation={true} // 네비게이션 버튼 여부
      pagination={{
        clickable: true, // 페이지네이션 클릭 가능 여부
      }}
      modules={[Keyboard, Scrollbar, Navigation, Pagination]}
      style={{
        backgroundColor: 'var(--bg-color)',
      }}
      // 이미지와 버튼 사이 간격
      spaceBetween={-30}
    >
        {visibleCover.map((src, index) => (
      <SwiperSlide>
        <img src={src} alt={`Book ${index + 1}`} />
      </SwiperSlide>
        ))}
    </Swiper>
  </>
    // <div className="carousel-container">
    //   <button className="carousel-button prev" onClick={handlePrev}>
    //     <img src={prevIcon} alt="Previous" className="carousel-icon" />
    //   </button>
    //   <div className="carousel">
    //     {visibleCover.map((src, index) => (
    //       <div className="carousel-slide" key={index}>
    //         <img src={src} alt={`Book ${index + 1}`} />
    //       </div>
    //     ))}
    //   </div>
    //   <button className="carousel-button next" onClick={handleNext}>
    //     <img src={nextIcon} alt="Next" className="carousel-icon" />
    //   </button>
    // </div>
  );
};

export default CarouselSwiper;
