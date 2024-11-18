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

useEffect(() => {
    dispatch(fetchPosts());
}, [dispatch]);


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
            key={post.id}
            bookTitle={post.bookTitle}
            title={post.title}
            content={post.text}
            date={post.date}
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
