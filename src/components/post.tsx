import styled from "styled-components";
import LikeButton from "./likeBtn";
import CommentButton from "./comBtn";
import Comment from "./comment";
import React, { useEffect, useState } from "react";
import DefaultImg from "../assets/images/DefaultImg.svg";
import { FaEllipsisV } from "react-icons/fa";
import Dialog from "./dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";
import { deletePost } from "../features/post/postsSlice";

interface PostProps {
  _id: string;
  id?: string;
  bookTitle: string;
  bookAuthor: string;
  title: string;
  text: string;
  date: string;
  author: string;
  profilePhoto: string | null;
  likes: number;
  comments: { author: string; text: string }[];
}
const StyledPost = styled.div`
  position: relative;
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
    position: relative;
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
const OptionsIcon = styled(FaEllipsisV)`
  cursor: pointer;
  font-size: 20px;
  margin-left: 8px;
  color: #666;
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
  color: #a4a4a4;
`;
const DialogContainer = styled.div`
`;
const ActionButton = styled.div`
    padding: 9px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background: #e2e6ea;
    }
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
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };
    const handleEdit = () => {
        console.log("Navigating with post ID:", _id);
        navigate("/post/write", {
            state: {
                post: {
                    _id,
                    title,
                    text,
                    bookTitle,
                    bookAuthor,
                },
            },
        });
    };
    const handleDelete = (id:string) => {
        dispatch(deletePost({id}))
    }
    return (
        <StyledPost>
        <Header>
            <TitleDate>
            <Title>{title}</Title>
            <Date>{date}</Date>
            </TitleDate>
            <ProfileInfo>
            <ProfilePhoto src={profilePhoto || DefaultImg} alt="Profile" />
            <Name>{author}</Name>
            <OptionsIcon onClick={handleDialogOpen} />
            </ProfileInfo>
            {isDialogOpen && (
            <Dialog isOpen={isDialogOpen} onClose={handleDialogClose} position="absolute" top="45px">
                <DialogContainer>
                    <ActionButton onClick={handleEdit}>수정</ActionButton>
                    <ActionButton onClick={() => handleDelete(_id)}>삭제</ActionButton>
                </DialogContainer>
            </Dialog>
            )}
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
            <Comment comments={comments} visible={commentsVisible} />
            </CommentSectionContainer>
        )}
        
        </StyledPost>
    );
};

export default Post;
