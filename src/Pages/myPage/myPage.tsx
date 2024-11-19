import React from "react";
import styled from "styled-components";
import { ReactComponent as ModifyIcon } from "../../assets/images/icon-more-vertical.svg";
import ProfileIcon from "../../assets/images/icon-user.png";
import Post from "./component/post";

const Container = styled.div`
  max-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: scroll;

  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;
const MyPageArea = styled.div`
  width: 960px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileArea = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
`;
const Photo = styled.div<{ imageUrl: string }>`
  margin-left: 10%;
  height: 120px;
  width: 120px;
  border-radius: 120px;
  background-image: url(${(props) => props.imageUrl}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const Info = styled.div`
  width: calc(75% - 120px);
  padding-left: 20px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserName = styled.div`
  font-size: 40px;
  font-weight: 500;
`;
const Summary = styled.div`
  color: #014421;
  font-size: 24px;
  font-weight: 700;
`;
const Modify = styled.div`
  margin-right: 10%;
  width: 5%;
  height: 120px;
  display: flex;
  justify-content: end;
`;
const Bnt = styled.button`
margin-top: 5px;
  height: 40px;
  width: 40px;
  border: none;
  background-color: transparent;
`;
const PostArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Filter = styled.div`
  width: 80%;
  margin: 0 10% 0 10%;
  height: 40px;
`;
const FilterBtn = styled.button`
  height: 100%;
  width: 100px;
  border: none;
  color: white;
  background-color: #014421;
  border-radius: 5px;
`;
const Posts = styled.div`
  padding-top: 20px;
  width: 80%;
  min-height: 100px;
`;

const examplePost = {
  bookTitle: "The Great Gatsby",
  bookAuthor: "F. Scott Fitzgerald",
  title: "A Classic Review",
  text: "This is an amazing book!",
  date: "2024-11-19",
  author: "John Doe",
  profilePhoto: "https://example.com/profile.jpg",
  likes: 25,
  comments: [
    { author: "Jane Doe", text: "I love this book too!" },
    { author: "Alex", text: "Great review!" },
  ],
};

const MyPage: React.FC = () => {
  return (
    <Container>
      <MyPageArea>
        <ProfileArea>
          <Photo imageUrl={ProfileIcon}></Photo>
          <Info>
            <UserName>asdf</UserName>
            <Summary>asdf</Summary>
          </Info>
          <Modify>
            <Bnt>
              <ModifyIcon />
            </Bnt>
          </Modify>
        </ProfileArea>
        <PostArea>
          <Filter>
            <FilterBtn>asdf</FilterBtn>
            <FilterBtn>asdf</FilterBtn>
          </Filter>
          <Posts>
            <Post post={examplePost} />
            <Post post={examplePost} />
            <Post post={examplePost} />
            <Post post={examplePost} />
            <Post post={examplePost} />
            <Post post={examplePost} />
            <Post post={examplePost} />
          </Posts>
        </PostArea>
      </MyPageArea>
    </Container>
  );
};

export default MyPage;
