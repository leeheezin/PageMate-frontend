import styled from 'styled-components';

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
interface CommentButtonProps {
    count: number;
    onClick: () => void;
}
const CommentButton: React.FC<CommentButtonProps> = ({ count, onClick }) => {
    return (
        <CommentContainer onClick={onClick}>
            <span>💬</span>
            <span style={{ marginLeft: '5px' }}>{count}</span>
        </CommentContainer>
    );
};

export default CommentButton;
