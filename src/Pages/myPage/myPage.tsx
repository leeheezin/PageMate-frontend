import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
`;
const MyPageArea = styled.div`
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  width: 960px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;    
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ProfileArea = styled.div`
  width: 100%;
  height: 220px;
  border: 1px solid black;
`;
const PostArea = styled.div`
  width: 100%;
`;
const MyPage: React.FC = () => {
  return (
    <Container>
      <MyPageArea>
        <ProfileArea>asdf</ProfileArea>
        <PostArea>asdf</PostArea>
      </MyPageArea>
    </Container>
  );
};

export default MyPage;
