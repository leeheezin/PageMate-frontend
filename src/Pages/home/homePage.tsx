import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../components/header';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../features/store';
import { fetchPosts, startLoading, stopLoading } from '../../features/post/postsSlice';
import Post from '../../components/post';

const formatDate = (dateString?: string): string => {
    if (!dateString) return "날짜 없음"; // createdAt이 없을 경우 처리
  
    const date: Date = new Date(dateString); 
    if (isNaN(date.getTime())) {
      return "Invalid date"; // 유효하지 않은 날짜일 경우 처리
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true, // 오후/오전 포함
    };
    return date.toLocaleString("ko-KR", options).replace(/(\d{4})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2})/, '$1.$2.$3. $7'); 
  };
  
const HomePageContainer = styled.div`
    margin: 0 auto;
    padding: 16px;
`;

const HomePage: React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const posts = useSelector((state: RootState) => state.posts.posts);
const loading = useSelector((state: RootState) => state.posts.loading);
const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 5)); // 초기 5개만
const [hasMore, setHasMore] = useState(true);

useEffect(() => {
    if (posts.length === 0) {  // posts가 비어있을 때만 데이터를 가져오도록
        dispatch(fetchPosts());
    }
}, [dispatch]);

useEffect(() => {
    if (!loading && posts.length > 0) {
        setDisplayedPosts(posts.slice(0, 5)); // 데이터가 있으면 초기 5개 설정
        setHasMore(true); // 추가 데이터가 있다고 가정
    }
}, [posts, loading]);

const fetchMorePosts = () => {
    const nextPosts = posts.slice(displayedPosts.length, displayedPosts.length + 5);
    if (nextPosts.length > 0) {
        setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts]);
    } else {
        setHasMore(false); 
    }
};
return (
<HomePageContainer>
    {loading ? (
    <Spinner />
    ) : (
    <InfiniteScroll
        dataLength={displayedPosts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<Spinner />}
    >
        {displayedPosts.map((post) => (
        <Post
            _id={post._id}
            key={post._id}
            bookTitle={post.bookTitle}
            bookAuthor={post.bookAuthor}
            title={post.title}
            text={post.text}
            date={formatDate(post.createdAt)}
            author={post.author}
            profilePhoto={post.profilePhoto}
            likes={post.likes}
            comments={post.comments}
        />
        ))}
    </InfiniteScroll>
    )}
</HomePageContainer>
);
};

export default HomePage;
