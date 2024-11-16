import styled from "styled-components";
import LikeButton from "./likeBtn";
import CommentButton from "./comBtn";
import Comment from "./comment";
import { useEffect, useState } from "react";

interface PostProps {
    bookTitle: string;
    content: string;
    date: string;
    author: string;
    profilePhoto: string;
    likes: number;
    comments: { author: string; text: string }[];
    }

    interface BookInfo {
    title: string;
    author: string;
    }
    const StyledPost = styled.div`
    width: 100%;
    max-width: 846px;
    border: 1px solid #878787;
    box-shadow: 0 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 16px;
    margin: auto;
    margin-bottom: 28px;
    padding: 16px;

    @media (max-width: 480px) {
        max-width: 330px;
        padding: 8px;
    }
    `;

    const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    `;

    const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    `;

    const ProfilePhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    `;

    const Name = styled.span`
    font-weight: bold;
    font-size: 16px;
    `;

    const TitleDate = styled.div``;

    const Date = styled.div`
    font-size: 12px;
    color: #666;
    `;

    const Title = styled.h4`
    text-align: left;
    margin: 0;
    `;

    const Content = styled.p`
    color: #014421;
    font-size: 14px;
    margin-bottom: 16px;
    `;

    const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    margin-bottom: 8px;
    `;
    const Inner = styled.div`
        display: flex;
        gap: 10px;
    `;
    const CommentSectionContainer = styled.div`
    width: 100%;
    margin-top: 8px;
    `;
    const BookTit = styled.div``;
    const BTitle = styled.div``;
    const BAuthor = styled.div`
        color: #A4A4A4;
    `;
    const Post: React.FC<PostProps> = ({
    bookTitle,
    content,
    date,
    author,
    profilePhoto,
    likes,
    comments,
    }) => {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [bookInfo, setBookInfo] = useState<BookInfo>({ title: "", author: "" });

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };
    useEffect(() => {
        setBookInfo({
            title: "미국주식 처음공부",
            author: "수미숨(상의민) 외 1명 지음 | 이레미디어 퍼냄",
        });
    }, []);
    return (
        <StyledPost>
        <Header>
            <TitleDate>
            <Title>{bookTitle}</Title>
            <Date>{date}</Date>
            </TitleDate>
            <ProfileInfo>
            <ProfilePhoto src={profilePhoto} alt="Profile" />
            <Name>{author}</Name>
            </ProfileInfo>
        </Header>
        <Content>{content}</Content>
        <Footer>
            <Inner>
                <LikeButton count={likes} />
                <CommentButton
                count={comments.length}
                onClick={toggleCommentsVisibility}
                />
            </Inner>
            <BookTit>
                <BTitle>{bookInfo.title}</BTitle>
                <BAuthor>{bookInfo.author}</BAuthor>
            </BookTit>
        </Footer>
        {commentsVisible && (
            <CommentSectionContainer>
            <Comment comments={comments} visible={commentsVisible} />
            </CommentSectionContainer>
        )}
        </StyledPost>
    );
};

export default Post;
