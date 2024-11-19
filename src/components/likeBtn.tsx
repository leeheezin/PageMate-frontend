import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../features/store';
import { toggleLike } from '../features/post/postsSlice'; // toggleLike action import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeart as faRegHeart } from '@fortawesome/free-solid-svg-icons';

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface LikeButtonProps {
    postId: string;
    userId: string; // 현재 로그인된 사용자 ID
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, userId }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Redux 상태에서 해당 post의 정보를 가져옵니다.
    const post = useSelector((state: RootState) =>
        state.posts.posts.find(post => post._id === postId) || null
    );

    const loading = useSelector((state: RootState) => state.posts.loading);  // 로딩 상태

    if (!post) return null; // post가 없으면 아무것도 렌더링 하지 않음

    const { liked, likes } = post;

    // 좋아요 상태 토글 함수
    const handleToggleLike = async () => {
        if (loading) return;

        try {
            // toggleLike 액션을 dispatch하여 서버에 요청
            await dispatch(toggleLike({ postId, userId })).unwrap();
        } catch (error) {
            console.error("좋아요 오류:", error);
        }
    };

    return (
        <LikeContainer onClick={handleToggleLike}>
            <FontAwesomeIcon 
                icon={liked ? faHeart : faRegHeart} 
                color={liked ? 'red' : 'black'} 
            />
            <span style={{ marginLeft: '8px' }}>{likes.length}</span>
        </LikeContainer>
    );
};

export default LikeButton;
