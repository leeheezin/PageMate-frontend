import styled from "styled-components";
import LikeButton from "./likeBtn";
import CommentButton from "./comBtn";
import Comment from "./comment";
import { useEffect, useState } from "react";

interface PostProps {
    _id: string;
    bookTitle: string;
    bookAuthor: string;
    title: string;
    text: string;
    date: string;
    author: string;
    profilePhoto: string;
    likes: number;
    comments: { author: string; text: string }[];
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
    _id,
    title,
    bookTitle,
    bookAuthor,
    text,
    date,
    author,
    profilePhoto,
    likes,
    comments,
    }) => {
        console.log(bookAuthor)
    const [commentsVisible, setCommentsVisible] = useState(false);

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };
    return (
        <StyledPost>
        <Header>
            <TitleDate>
            <Title>{title}</Title>
            <Date>{date}</Date>
            </TitleDate>
            <ProfileInfo>
            <ProfilePhoto src={profilePhoto} alt="Profile" />
            <Name>{author}</Name>
            </ProfileInfo>
        </Header>
        <Content>{text}</Content>
        <Footer>
            <Inner>
                <LikeButton count={likes} />
                <CommentButton
                count={comments.length}
                onClick={toggleCommentsVisibility}
                />
            </Inner>
            <BookTit>
                <BTitle>{bookTitle}</BTitle>
                <BAuthor>{bookAuthor}</BAuthor>
            </BookTit>
        </Footer>
        {commentsVisible && (
            <CommentSectionContainer>
            <Comment visible={commentsVisible} postId={_id}/>
            </CommentSectionContainer>
        )}
        </StyledPost>
    );
};

export default Post;
