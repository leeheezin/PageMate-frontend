import { useState, useEffect } from 'react';
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
  likes: string[]; // 좋아요를 누른 사용자 ID 배열
  userId: string; // 현재 로그인된 사용자 ID
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // 현재 좋아요 상태와 갯수 상태를 로컬 상태로 관리
  const [liked, setLiked] = useState<boolean>(likes.includes(userId));
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  
  // 좋아요 상태 토글 함수
  const handleToggleLike = async () => {
    try {
      // toggleLike 액션을 dispatch하여 서버에 요청
      const updatedPost = await dispatch(toggleLike({ postId, userId })).unwrap();
      
      // 서버에서 반환된 최신 데이터로 좋아요 상태와 카운트를 갱신
      const newLikes = updatedPost.likes;
      const newLikeCount = newLikes.length;

      setLiked(newLikes.includes(userId));  // 좋아요 상태 갱신
      setLikeCount(newLikeCount); // 좋아요 수 갱신
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

<<<<<<< HEAD
  return (
    <LikeContainer onClick={handleToggleLike}>
      <FontAwesomeIcon 
        icon={liked ? faHeart : faRegHeart} 
        color={liked ? 'red' : 'black'} 
      />
      <span style={{ marginLeft: '8px' }}>{likeCount}</span> {/* 좋아요 갯수 표시 */}
    </LikeContainer>
  );
=======
    return (
        <LikeContainer onClick={handleToggleLike}>
            <FontAwesomeIcon icon={liked ? faHeart : (faRegHeart as any)} color={liked ? 'red' : 'black'} />
            <span style={{ marginLeft: '8px' }}>{plusCount}</span>
        </LikeContainer>
    );
>>>>>>> 0672d91 (create gpt api func)
};

export default LikeButton;
