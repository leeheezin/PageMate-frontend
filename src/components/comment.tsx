import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments  } from '../features/comment/commentSlice'; // Import the action
import { RootState, AppDispatch } from '../features/store'; // Import the types

const CommentContainer = styled.div`
    margin-top: 8px;
`;

const CommentItem = styled.p`
    margin: 4px 0;
`;

const InputContainer = styled.div`
    display: flex;
    margin-top: 8px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
`;

const SubmitButton = styled.button`
    padding: 8px 12px;
    background-color: #014421;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #01381e;
    }
`;

interface CommentProps {
    visible: boolean;
    postId: string; // 해당 게시물의 ID
}

const Comment: React.FC<CommentProps> = ({ visible, postId }) => {
    const [inputValue, setInputValue] = useState('');
    const { comments, loading, error } = useSelector((state: RootState) => state.comments);
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

    if (!visible) {
        return null;
    }
    console.log("c",comments);
    return (
        <CommentContainer>
            {comments.map((comment, index) => (
                <CommentItem key={index}>
                    <strong>{comment.author}:</strong> {comment.text}
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
                    {loading ? '...' : '^'}
                </SubmitButton>
            </InputContainer>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </CommentContainer>
    );
};

export default Comment;
