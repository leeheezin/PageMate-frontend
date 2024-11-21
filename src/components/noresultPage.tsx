import React from "react";
import styled from "styled-components";
import NoBookIcon from "../assets/images/icon-nobook1.png";

interface NoResultProps {
  bookTitle: string | null;
}

const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  text-align: center;
  // background-color: #f9f4f0; /* 배경색 */
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const NoResultText = styled.p`
  font-size: 18px;
  margin-bottom: 25px;

  span {
    font-size: 22px; /* 강조 텍스트 크기 */
    color: red;
    font-weight: bold;
  }

  &:nth-child(3) {
    font-size: 16px;
    color: #878787;
    line-height: 1.5;
  }
`;

const NoResult: React.FC<NoResultProps> = ({ bookTitle }) => {
  const displayTitle = bookTitle || "검색어"; // null일 경우 "검색어"로 대체
  return (
    <NoResultContainer>
      <Icon src={NoBookIcon} alt="No Book Icon" />
      <NoResultText>
        ‘<span>{displayTitle}</span>’ 에 대한 도서 리뷰가 없습니다.
      </NoResultText>
      <NoResultText>
        단어에 대한 철자가 정확한지 확인해주세요.
        <br />
        다른 책의 제목으로 검색해 보세요.
      </NoResultText>
    </NoResultContainer>
  );
};

export default NoResult;
