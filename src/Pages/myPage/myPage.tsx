import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ModifyIcon } from "../../assets/images/icon-more-vertical.svg";
import ProfileIcon from "../../assets/images/icon-user.png";
import PostComponent from "./component/post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { getLikedPost, getMyPost } from "../../features/post/postsSlice";
import {Post} from "../../features/post/postsSlice"

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
const FilterBtn = styled.button<{ highlight: boolean }>`
  height: 100%;
  width: 130px;
  border: none;
  color: ${(props) => (props.highlight ? "white" : "black")};
  background-color: ${(props) => (props.highlight ? "#014421" : "#ffffff")};
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;
const Posts = styled.div`
  padding-top: 20px;
  width: 80%;
  min-height: 100px;
`;
const examplePost = {
  _id: "",
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
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { myPosts, myLiked } = useSelector((state: RootState) => state.posts);

  const [highlight, setHighlight] = useState<boolean>(true);
    const [posts, setPost] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(getMyPost());
    dispatch(getLikedPost());
  }, [user]);

  useEffect(() =>{
    setPost(myPosts)
  },[myPosts])

  const handleBtn = (event: any) => {
    event.preventDefault();

    const { id } = event.target;

    if (id === "my") {
      setHighlight(true);
      setPost(myPosts)
    } else {
      setHighlight(false);
      setPost(myLiked)
    }
  };

  return (
    <Container>
      <MyPageArea>
        <ProfileArea>
          <Photo imageUrl={ProfileIcon}></Photo>
          <Info>
            <UserName>{user?.data?.name || "unknown"}</UserName>
            <Summary>내 {highlight?"게시글":"좋아요"} {posts.length||0}개</Summary>
          </Info>
          <Modify>
            <Bnt>
              <ModifyIcon />
            </Bnt>
          </Modify>
        </ProfileArea>
        <PostArea>
          <Filter>
            <FilterBtn id="my" highlight={highlight} onClick={handleBtn}>
              내 게시글
            </FilterBtn>
            <FilterBtn highlight={!highlight} onClick={handleBtn}>
              좋아요 게시글
            </FilterBtn>
          </Filter>
          <Posts>
            {posts?.length > 0 ? (
              posts.map((post, index) => <PostComponent key={index} post={post} />)
            ) : (
              <div>게시글이 없습니다.</div>
            )}
          </Posts>
        </PostArea>
      </MyPageArea>
    </Container>
  );
};

export default MyPage;
