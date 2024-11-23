import { useState } from "react";
import prevIcon from "../../assets/images/icon-left.png";
import nextIcon from "../../assets/images/icon-right.png";

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
  const visibleCount = 10;
   

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
  const visibleCover = Array.from({ length: visibleCount }, (_, i) =>
    covers[ i % covers.length] 
  );

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>
        <img src={prevIcon} alt="Previous" className="carousel-icon" />
      </button>
      <div className="carousel-viewport"> {/* 새로 추가된 wrapper */}
      <div className="carousel">
        {visibleCover.map((src, index) => (
          <div 
          className="carousel-slide" 
          key={index}
          style={{
            transform: `translateX(-${ startIndex * 105}%)`,
            transition: 'transform 0.3s ease-out'
          }}  
          >
            <img src={src} alt={`Book ${index + 1}`} />
          </div>
        ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        <img src={nextIcon} alt="Next" className="carousel-icon" />
      </button>
    </div>
  );
};

export default CarouselSwiper;