import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as faRegComment } from '@fortawesome/free-regular-svg-icons'; 


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
            <FontAwesomeIcon icon={faRegComment} />
            <span style={{ marginLeft: '5px' }}>{count}</span>
        </CommentContainer>
    );
};

export default CommentButton;
