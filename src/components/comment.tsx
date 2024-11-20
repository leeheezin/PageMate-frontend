import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const CommentContainer = styled.div`
    border-top: 1px solid #D2D1D1;
    margin-top: 8px;
`;

const CommentItem = styled.p`
    margin: 4px 0;
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

interface CommentProps {
    comments: { author: string; text: string }[];
    visible: boolean;
}

const Comment: React.FC<CommentProps> = ({ comments, visible }) => {
    const [inputValue, setInputValue] = useState('');
    const [newComments, setNewComments] = useState<{ author: string; text: string }[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddComment = () => {
        if (inputValue.trim() !== '') {
            setNewComments([...newComments, { author: '나', text: inputValue }]);
            setInputValue('');
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <CommentContainer>
            {comments.map((comment, index) => (
                <CommentItem key={index}>
                    <strong>{comment.author}:</strong> {comment.text}
                </CommentItem>
            ))}
            {newComments.map((comment, index) => (
                <CommentItem key={comments.length + index}>
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
                <SubmitButton onClick={handleAddComment}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </SubmitButton>
            </InputContainer>
        </CommentContainer>
    );
};

export default Comment;
