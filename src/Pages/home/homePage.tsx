import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../../components/header";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../features/store";
import {
  fetchPosts,
  startLoading,
  stopLoading,
} from "../../features/post/postsSlice";
import Post from "../../components/post";
import PostSkeleton from "../../components/postSkeleton";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜";
  }
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const HomePageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 16px;
  overflow: hidden; /* 스크롤바 숨기기 */


`;

const HomePage: React.FC = () => {
  const limitMax = 6;
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const pagination = useSelector((state: RootState) => state.posts.pagination);
  const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchPosts({ page: 1, limit: limitMax }));
  }, [dispatch]);
  useEffect(() => {
    setHasMore(pagination.hasMore);
  }, [pagination.hasMore]);
  const fetchMorePosts = () => {
    if (loading || !pagination.hasMore) return;
    dispatch(fetchPosts({ page: pagination.currentPage + 1, limit: limitMax }));
  };

  const handleCommentToggle = (postId: string) => {
    // 같은 포스트 클릭 시 닫고, 다른 포스트 클릭 시 열기
    setActiveCommentPostId((prevId) => (prevId === postId ? null : postId));
  };
  if (loading) {
    return <PostSkeleton />;
  }
  return (
    <HomePageContainer>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        {posts.map((post) => (
          <Post
            id={post.id}
            _id={post._id}
            key={post._id}
            userId={post.userId}
            bookTitle={post.bookTitle}
            bookAuthor={post.bookAuthor}
            title={post.title}
            text={post.text}
            date={formatDate(post.date)}
            name={post.name}
            profilePhoto={post.profilePhoto}
            likes={post.likes}
            comments={post.comments}
            isCommentVisible={activeCommentPostId === post._id} // 댓글 영역이 열려 있는지 여부 전달
            onCommentToggle={handleCommentToggle} // 댓글 토글 핸들러 전달
          />
        ))}
      </InfiniteScroll>
    </HomePageContainer>
  );
};

export default HomePage;
