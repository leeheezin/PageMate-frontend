import styled from "styled-components";
import LikeButton from "./likeBtn";
import CommentButton from "./comBtn";
import Comment from "./comment";
import React, { useEffect, useState } from "react";
import ProfileIcon from "../assets/images/icon-user.png"
import { FaEllipsisV } from "react-icons/fa";
import Dialog from "./dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { deletePost } from "../features/post/postsSlice";

interface PostProps {
  _id: string;
  userId?: string;
  bookTitle: string;
  bookAuthor: string;
  title: string;
  text: string;
  date: string;
  createdAt?: string;
  author: string;
  profilePhoto: string | null;
  likes: string[];
  comments: { author: string; text: string }[];
  isCommentVisible?: boolean; // 댓글 영역이 열려 있는지 여부
  onCommentToggle?: (postId: string) => void; // 댓글 토글 핸들러
}
interface UserResponse {
  status: string;
  data: {
    _id: string;
    email: string;
    profilePhoto?: string;
  };
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
    max-width: 358px;
    padding: 9px 10px;
    margin-bottom: 14px;
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
  font-size: 24px;
  text-align: left;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Content = styled.p`
  color: #014421;
  font-size: 20px;
  margin-bottom: 16px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;
const Inner = styled.div`
  display: flex;
  gap: 10px;
`;
const CommentSectionContainer = styled.div`
  width: 100%;
  margin-top: 8px;
`;
const BookTit = styled.div`
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
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
    userId,
    _id,
    title,
    bookTitle,
    bookAuthor,
    text,
    date,
    author,
    profilePhoto,
    likes,
    createdAt,
    comments,
    isCommentVisible = false, // @@기본값 설정
    onCommentToggle,  // @@함수 전달 여부에 따라 동작 추가해야함
    }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [localError, setLocalError] = useState<string | null>(null);

    // @추가
    const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null); // 열려 있는 댓글 영역의 포스트 ID

    const currentUser = useSelector((state: RootState) => state.user.user) as UserResponse | null;
    const currentUserId = currentUser?.data._id;
    // 게시글 작성자가 현재 로그인한 사용자인지 확인
    const isOwner = currentUserId === userId;
    
    console.log('currentUserId:', currentUserId);
    console.log('userId:', userId);
    console.log('isOwner:', isOwner);

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };
    const handleDialogClose = () => {   
        setIsDialogOpen(false);
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
    const handleDelete = async (id: string) => {
        try {
            await dispatch(deletePost({ id })).unwrap();
            setLocalError(null);
        } catch (error: any) {
            setLocalError(error);
            console.log(error)
        }
    };
    
    //@@ 추가
    const handleCommentToggle = (postId: string) => {
      // 같은 포스트 클릭 시 닫고, 다른 포스트 클릭 시 열기
      setActiveCommentPostId((prevId) => (prevId === postId ? null : postId));
    };

    return (
        <StyledPost>
        <Header>
            <TitleDate>
            <Title>{title}</Title>
            <Date>{date}</Date>
            </TitleDate>
            <ProfileInfo>
            <ProfilePhoto src={profilePhoto || ProfileIcon} alt="Profile" />
            <Name>{author}</Name>
            {/* 게시글 작성자만 메뉴 볼수있게 조건 */}
            {currentUser && isOwner && ( 
                <>
                    <OptionsIcon onClick={handleDialogOpen} />
                    {isDialogOpen && (
                        <Dialog isOpen={isDialogOpen} onClose={handleDialogClose} position="absolute" top="45px">
                            <DialogContainer>
                                <ActionButton onClick={handleEdit}>수정</ActionButton>
                                <ActionButton onClick={() => handleDelete(_id)}>삭제</ActionButton>
                            </DialogContainer>
                        </Dialog>
                    )}
                </>
            )} 
            </ProfileInfo>

        </Header>
        <Content>{text}</Content>
        <Footer>
          <Inner>
            <LikeButton postId={_id} />
            <CommentButton
                        count={comments.length}
                        onClick={() => {
                          if (onCommentToggle) {
                            onCommentToggle(_id); // @@onCommentToggle이 있을 때만 호출
                          }
                        }} // 댓글 토글 핸들러 호출
            />
          </Inner>
          <BookTit>
            <BTitle>{bookTitle}</BTitle>
            <BAuthor>{bookAuthor}</BAuthor>
          </BookTit>
        </Footer>
          {isCommentVisible && (
              <CommentSectionContainer>
                  <Comment visible={isCommentVisible} postId={_id} />
              </CommentSectionContainer>
          )}
        </StyledPost>
    );
};

export default Post;
