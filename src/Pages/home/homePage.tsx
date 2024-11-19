import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../components/header';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../features/store';
import { fetchPosts, startLoading, stopLoading } from '../../features/post/postsSlice';
import Post from '../../components/post';

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

const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null); // 열려 있는 댓글 영역의 포스트 ID

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

const handleCommentToggle = (postId: string) => {
    // 같은 포스트 클릭 시 닫고, 다른 포스트 클릭 시 열기
    setActiveCommentPostId((prevId) => (prevId === postId ? null : postId));
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
            date={post.date}
            author={post.author}
            profilePhoto={post.profilePhoto}
            likes={post.likes}
            comments={post.comments}
            isCommentVisible={activeCommentPostId === post._id} // 댓글 영역이 열려 있는지 여부 전달
            onCommentToggle={handleCommentToggle} // 댓글 토글 핸들러 전달
        />
        ))}
    </InfiniteScroll>
    )}
</HomePageContainer>
);
};

export default HomePage;
