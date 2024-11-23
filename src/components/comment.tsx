import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ProfileIcon from "../assets/images/icon-user.png";
import ConfirmDialog from "./comfirmDialog";
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments, deleteComment } from '../features/comment/commentSlice'; // Import the action
import { RootState, AppDispatch } from '../features/store'; // Import the types

const CommentContainer = styled.div`
    border-top: 1px solid #D2D1D1;
    margin-top: 8px;
    padding-top: 8px;
`;

const CommentItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 12px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #d3d3d3; // 기본 회색 프로필 이미지
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const Author = styled.span`
    font-weight: bold;
    font-size: 14px;
`;

const Date = styled.span`
    font-size: 12px;
    color: #666;
    margin-left: 4px;
`;

const Text = styled.p`
    margin: 4px 0 0 0;
    font-size: 14px;
    color: #014421;
`;

const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const InputContainer = styled.div`
    display: flex;
    margin-top: 8px;
    position: relative;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-right: 40px; /* 공간 확보 */
    width: 100%;
`;

const SubmitButton = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    padding: 8px;
    color: gray;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        color: #5b5b5b;
    }
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: gray;
    cursor: pointer;
    font-size: 12px;
    margin-left: auto;
    &:hover {
        text-decoration: underline;
    }
`;

interface CommentProps {
    visible: boolean;
    postId: string; // 해당 게시물의 ID
    onCommentCountChange?: (newCount: number) => void; // 콜백 @추가
    isMyPage: boolean;
}

const Comment: React.FC<CommentProps> = ({ visible, postId, onCommentCountChange, isMyPage }) => {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // ConfirmDialog 열림 상태
    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null); // 삭제할 댓글 ID 저장
    const { comments, loading, error } = useSelector((state: RootState) => state.comments);
    const currentUser = useSelector((state: RootState) => state.user.user); // 현재 로그인한 유저 정보
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (visible) {
            dispatch(fetchComments(postId)); // 댓글 가져오기
        }
    }, [visible, postId, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddComment = async () => {
        if (inputValue.trim() !== '') {
            console.log("inputValue",inputValue);
            await dispatch(addComment({ postId, text: inputValue })); // 댓글 추가 후
            setInputValue('');
            dispatch(fetchComments(postId)); // 댓글 목록 새로 가져오기
            onCommentCountChange?.(comments.length + 1); // 댓글 수 증가
        }
    };
    
    const handleDeleteComment = async () => {
        if (selectedCommentId) {
            try {
                await dispatch(deleteComment({ postId, commentId: selectedCommentId })).unwrap();
                dispatch(fetchComments(postId));
                onCommentCountChange?.(comments.length - 1);
            } catch (err) {
                console.error('댓글 삭제 중 오류 발생:', err);
            }
            closeDeleteConfirmDialog(); // 모달 닫기
        }
    };

    const openDeleteConfirmDialog = (commentId: string) => {
        setSelectedCommentId(commentId); // 삭제할 댓글 ID 설정
        setIsModalOpen(true); // 모달 열기
    };

    const closeDeleteConfirmDialog = () => {
        setSelectedCommentId(null); // 선택된 댓글 ID 초기화
        setIsModalOpen(false); // 모달 닫기
    };
    
    if (!visible) {
        return null;
    }

    return (
        <CommentContainer>
            {loading ? (
                <div>댓글을 불러오는 중...</div> // 로딩 중 상태
            ) :comments.length>0?comments.map((comment, index) => (
                <CommentItem key={index}>
                     <ProfileImage
                        src ={ (comment.profilePhoto || ProfileIcon) as string } // profilePhoto가 없으면 기본 이미지
                        alt={`${comment.author}의 프로필`}
                    />
                     <CommentContent>
                        <CommentHeader>    
                            <Author>{comment.author}</Author>
                            <Date>{comment.commentDate
                                ? comment.commentDate
                                : "방금 전"}
                            </Date>
                        </CommentHeader>
                        <Text>{comment.text}</Text>
                    </CommentContent>
                    {currentUser?._id === comment.userId && ( // 현재 유저와 댓글 작성자의 _id 비교
                        <DeleteButton onClick={() => openDeleteConfirmDialog(comment.id)}>삭제</DeleteButton>
                    )}
                            
                </CommentItem>
            )):(<div>댓글이 없습니다</div>)}
            {!isMyPage &&
            (<InputContainer>
                <CommentInput 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddComment();
                        }
                    }}
                    placeholder="댓글 달기" 
                    disabled={!currentUser} // 로그인하지 않은 경우 비활성화
                />
                <SubmitButton 
                    onClick={handleAddComment} 
                    disabled={!currentUser || loading} // 로그인하지 않거나 로딩 중이면 비활성화
                >
                    {loading ? '...' : <FontAwesomeIcon icon={faChevronUp} />}
                </SubmitButton>
            </InputContainer>)}
            {error && <p style={{ color: 'red' }}>{error}</p>}

             {/* ConfirmDialog 추가 */}
             <ConfirmDialog
                isOpen={isModalOpen}
                onClose={closeDeleteConfirmDialog}
                onConfirm={handleDeleteComment}
            >
                댓글을 삭제하시겠습니까?
            </ConfirmDialog>

        </CommentContainer>
    );
};

export default Comment;
