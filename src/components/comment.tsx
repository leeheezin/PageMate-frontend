import React, { useState } from 'react';
import styled from 'styled-components';

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
                <SubmitButton onClick={handleAddComment}>^</SubmitButton>
            </InputContainer>
        </CommentContainer>
    );
};

export default Comment;
