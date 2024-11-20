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
    const user = useSelector((state: RootState) => state.user.user) as UserResponse | null;
    const loading = useSelector((state: RootState) => state.posts.loading);

    if (!post || !user || !user.data) return null; // post나 user가 없으면 아무것도 렌더링 하지 않음
    const userId = user.data._id; 
    const liked = post.likes.includes(userId); 
    console.log('Liked', liked);

    const handleToggleLike = async () => {
        if (loading) return;

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
