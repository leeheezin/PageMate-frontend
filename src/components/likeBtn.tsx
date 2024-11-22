import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../features/store';
import { toggleLike } from '../features/post/postsSlice'; // toggleLike action import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface LikeButtonProps {
    postId: string;
}

interface UserResponse {
    status: string;
    data: {
        _id: string;
        email: string;
        name: string;
        profilePhoto?: string;
    };
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const post = useSelector((state: RootState) =>
        state.posts.posts.find(post => post._id === postId) || null
    );
    const user = useSelector((state: RootState) => state.user.user);

    if (!post) return null; 

    const userId = user?._id || ""; 
    const liked = user ? post.likes.includes(userId) : false; 

    const handleToggleLike = async () => {
        try {
            await dispatch(toggleLike({ postId, userId })).unwrap();
        } catch (error) {
            console.error("좋아요 오류:", error);
            if (!user) {
                navigate('/login');
            }
        }
    };

    return (
        <LikeContainer onClick={handleToggleLike}>
            <FontAwesomeIcon 
                icon={liked ? faHeart : faRegHeart} 
                color={liked ? 'red' : 'black'} 
            />
            <span style={{ marginLeft: '8px' }}>{post.likes.length}</span>
        </LikeContainer>
    );
};

export default LikeButton;
