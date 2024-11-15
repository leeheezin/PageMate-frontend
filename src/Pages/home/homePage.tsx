import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../components/header';
import Post from '../../components/post';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/spinner';

interface PostType {
    id: number;
    bookTitle: string;
    content: string;
    date: string;
    author: string;
    profilePhoto: string;
    likes: number;
    comments: { author: string; text: string }[];
}

const HomePageContainer = styled.div`
    margin: 0 auto;
    padding: 16px;
`;

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // const res = await axios.get<PostType[]>('/api/posts');
                // if (res.data.length > 0) {
                //     setPosts(res.data.slice(0, 5)); // 첫 5개의 게시글만 로딩
                // }

                //더미
                setPosts([
                    {
                        id: 1,
                        bookTitle: '제목',
                        content: '포스트내용포스트내용포스트내용',
                        date: '2024-11-15 10:30',
                        author: '작성자 1',
                        profilePhoto: 'profile-image-url.jpg',
                        likes: 5,
                        comments: [
                            { author: '사용자1', text: '정말 유익해요!' },
                            { author: '사용자2', text: '좋은 정보 감사합니다.' },
                        ],
                    },
                    {
                        id: 1,
                        bookTitle: '제목',
                        content: '포스트내용포스트내용포스트내용',
                        date: '2024-11-15 10:30',
                        author: '작성자 1',
                        profilePhoto: 'profile-image-url.jpg',
                        likes: 5,
                        comments: [
                            { author: '사용자1', text: '정말 유익해요!' },
                            { author: '사용자2', text: '좋은 정보 감사합니다.' },
                        ],
                    },
                    {
                        id: 1,
                        bookTitle: '제목',
                        content: '포스트내용포스트내용포스트내용',
                        date: '2024-11-15 10:30',
                        author: '작성자 1',
                        profilePhoto: 'profile-image-url.jpg',
                        likes: 5,
                        comments: [
                            { author: '사용자1', text: '정말 유익해요!' },
                            { author: '사용자2', text: '좋은 정보 감사합니다.' },
                        ],
                    },
                    {
                        id: 1,
                        bookTitle: '제목',
                        content: '포스트내용포스트내용포스트내용',
                        date: '2024-11-15 10:30',
                        author: '작성자 1',
                        profilePhoto: 'profile-image-url.jpg',
                        likes: 5,
                        comments: [
                            { author: '사용자1', text: '정말 유익해요!' },
                            { author: '사용자2', text: '좋은 정보 감사합니다.' },
                        ],
                    },
                ]);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const fetchMorePosts = async () => {
        try {
            // const res = await axios.get<PostType[]>('/api/posts?offset=' + posts.length);
            // if (res.data.length > 0) {
            //     setPosts(prevPosts => [...prevPosts, ...res.data]);
            // } else {
            //     setHasMore(false);
            // }

            //스크롤 테스트
            if (posts.length < 10) {
                setTimeout(() => {
                    const newPosts = posts.map((post, index) => ({
                        ...post,
                        id: posts.length + index + 1,
                        bookTitle: `추가 ${posts.length + index + 1}`,
                    }));
                    setPosts(prevPosts => [...prevPosts, ...newPosts]);
                }, 1500);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more posts:', error);
            setHasMore(false);
        }
    };

    return (
        <HomePageContainer>
            <Header />
            {isLoading ? (
                <Spinner/>
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={hasMore}
                    loader={<Spinner/>}
                >
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            bookTitle={post.bookTitle}
                            content={post.content}
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
