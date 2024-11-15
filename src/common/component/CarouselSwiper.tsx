import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "../style/common.style.css"
// import { Navigation } from "swiper/modules"; // 최신 Swiper에서의 Navigation 가져오기
import { FreeMode, Pagination } from 'swiper/modules';

const CarouselSwiper: React.FC = () => {
  return (
    <div className="popup_slide">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>

      {/* 내비게이션 버튼 */}
      <div className="popup-navigation">
        <button className="swiper-button-prev">Prev</button>
        <button className="swiper-button-next">Next</button>
      </div>
    </div>
  );
};

export default CarouselSwiper;
