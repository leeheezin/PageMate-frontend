import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments, deleteComment } from '../features/comment/commentSlice'; // Import the action
import { RootState, AppDispatch } from '../features/store'; // Import the types

const CommentContainer = styled.div`
    border-top: 1px solid #D2D1D1;
    margin-top: 8px;
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
}

const Comment: React.FC<CommentProps> = ({ visible, postId }) => {
    const [inputValue, setInputValue] = useState('');
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
        }
    };
    
    const handleDeleteComment = async (commentId: string) => {
        try {
            await dispatch(deleteComment({ postId, commentId })).unwrap(); // 댓글 삭제
            dispatch(fetchComments(postId)); // 댓글 목록 새로 가져오기
        } catch (err) {
            console.error('댓글 삭제 중 오류 발생:', err);
        }
    };

    if (!visible) {
        return null;
    }
    console.log("c",comments);
    return (
        <CommentContainer>
            {comments.map((comment, index) => (
                <CommentItem key={index}>
                     <ProfileImage
                        src ={ (comment.profilePhoto || '/path/to/default/profile.png') as string } // profilePhoto가 없으면 기본 이미지
                        alt={`${comment.author}의 프로필`}
                    />
                     <CommentContent>
                        <CommentHeader>    
                            <Author>{comment.author}</Author>
                            <Date>{comment.commentDate
                                ? comment.commentDate.toLocaleString()
                                : "방금 전"}
                            </Date>
                        </CommentHeader>
                        <Text>{comment.text}</Text>
                    </CommentContent>
                    {/* {currentUser?._id === comment.id && ( // 현재 유저와 댓글 작성자의 _id 비교 */}
                    {"673b66d9320a8682a2ff723e" === comment.userId && ( // 현재 유저와 댓글 작성자의 _id 비교
                        <DeleteButton onClick={() => handleDeleteComment(comment.id)}>삭제</DeleteButton>
                    )}
                            
                </CommentItem>
            ))}
            <InputContainer>
                <CommentInput 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    placeholder="댓글 달기" 
                />
                <SubmitButton onClick={handleAddComment} disabled={loading}>
                    {loading ? '...' : <FontAwesomeIcon icon={faChevronUp} />}
                </SubmitButton>
            </InputContainer>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </CommentContainer>
    );
};

export default Comment;
