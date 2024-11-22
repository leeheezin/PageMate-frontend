// PostSkeleton.tsx
import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// 스타일 컴포넌트
const PostContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

`
const StyledSkeletonPost = styled.div`
  position: relative;
  width: 100%;
  max-width: 846px;
  border: 1px solid #878787;
  box-shadow: 0 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 16px;
  margin: auto;
  margin: 16px 16px 44px 16px;
  padding: 16px;
  // max-width: 846px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;



const PostSkeleton: React.FC = () => {
  // 반복할 스켈레톤 개수를 설정
  const skeletonCount = 3;

  // 스켈레톤 구조를 반환하는 함수
  const renderSkeleton = () => (
    <StyledSkeletonPost>
      <Header>
        <div>
          <Skeleton width={200} height={24} />
          <Skeleton width={100} height={12} style={{ marginTop: 8 }} />
        </div>
        <div>
          <Skeleton circle width={40} height={40} />
        </div>
      </Header>
      <Skeleton count={2} height={20} style={{ marginBottom: "16px" }} />
      <Footer>
        <Skeleton width={50} height={32} />
        <Skeleton width={120} height={20} />
      </Footer>
    </StyledSkeletonPost>
  );

  return (
    <PostContainer>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </PostContainer>
  );
};

export default PostSkeleton;