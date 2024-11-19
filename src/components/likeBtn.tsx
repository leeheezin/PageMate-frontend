import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

const LikeContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const LikeButton: React.FC<{ count: number }> = ({ count }) => {
    const [liked, setLiked] = useState(false);
    const [plusCount, setPlusCount] = useState(count);

    const handleToggleLike = () => {
        setLiked(!liked);
        setPlusCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));
    };

    return (
        <LikeContainer onClick={handleToggleLike}>
            <FontAwesomeIcon icon={liked ? faHeart : (faRegHeart as any)} color={liked ? 'red' : 'black'} />
            <span style={{ marginLeft: '8px' }}>{plusCount}</span>
        </LikeContainer>
    );
};

export default LikeButton;
