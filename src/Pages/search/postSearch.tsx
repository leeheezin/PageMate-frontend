import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchBooks } from "../../features/book/bookSlice";
import { fetchPosts } from "../../features/post/postsSlice";
import { AppDispatch, RootState } from "../../features/store"; // AppDispatch 타입 임포트
import CarouselSwiper from "./CarouselSwiper";
import NoResult from "../../components/noresultPage";
import Post from '../../components/post';
import HomePage from "../home/homePage";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./postSearch.style.css"
import PostSkeleton from "../../components/postSkeleton";

const PostSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false); // 검색 여부 상태 추가

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null); // 열려 있는 댓글 영역의 포스트 ID

  // Redux 상태에서 books 데이터를 가져옵니다.
  const dispatch = useDispatch<AppDispatch>();  // dispatch 타입 지정
  const { books } = useSelector((state: RootState) => state.book);
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  
  const location = useLocation(); // 현재 URL 정보 가져오기
  const navigate = useNavigate(); // 네비게이션 훅 초기화
  
  // URL 파라미터에서 검색어 추출
  const queryParams = new URLSearchParams(location.search);
  const urlQuery = queryParams.get("bookTitle");


  const fetchSearchResults = () => {
    // 검색 데이터를 가져오는 로직
    if (urlQuery) {
      dispatch(fetchPosts({ bookTitle: urlQuery  }));
    }
  };

  useEffect(() => {
    // state.posts  초기화 
    dispatch(fetchPosts({ bookTitle: "" }));
  }, []);

  // 검색어가 변경되거나 URL이 업데이트될 때 실행
  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
      setSearched(true);
      // fetchSearchResults();
    }
  }, [urlQuery, dispatch]);

  // URL에 검색어가 없으면 초기화
  useEffect(() => {
    if (!urlQuery) {
      setQuery("");
      setSearched(false);
    }
  }, [location.search]);

  // 베스트셀러 데이터 요청
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }
  
    // console.log('query',query)
    navigate(`/search?bookTitle=${encodeURIComponent(query)}`);
    setSearched(true); // 검색 버튼 클릭 시 검색 상태로 변경
    try {
      // Redux에 검색 기능이 있는 경우
      await dispatch(fetchPosts({ bookTitle: query ,search: true }));
      // onSearch(query); // 검색어를 상위 컴포넌트로 전달
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      alert("검색에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // books에서 cover만 추출하여 CarouselSwiper로 전달
  const covers = books.map((book) => book.cover);
  // console.log('posts', posts);
  
  const handleCommentToggle = (postId: string) => {
    // 같은 포스트 클릭 시 닫고, 다른 포스트 클릭 시 열기
    setActiveCommentPostId((prevId) => (prevId === postId ? null : postId));
  };
  return (
    <>
      {!searched ? (
        <>
          <div className="desktop-search-results">
            <div className="search-box">
              <form onSubmit={handleSubmit} className="search-form">
                <input
                  type="search"
                  className="searchPage-search-input"
                  placeholder="도서 제목으로 리뷰 검색"
                  value={query}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <button type="submit" className="search-button">
                  검색
                </button>
              </form>
            </div>

            <div className="popular-books-container">
              {/* '오늘의 인기 도서' 영역 */}
              <div className="today-popular">
                <p>
                  오늘의<br />
                  인기<br />
                  도서
                </p>
              </div>
              {/* Carousel */}
              <CarouselSwiper covers={covers}/>
            </div>
          </div>
          <div className="mobile-search-results">
            <HomePage />
          </div>
        </>
      ) : (
        <div>
          {loading && <PostSkeleton />}
          {error && <p>에러가 발생했습니다: {error}</p>}
          {!loading && searched && posts.length === 0 && (
            // <p>해당 책에 대한 결과가 없습니다.</p>
            <>
              <div className="search-box">
                <form onSubmit={handleSubmit} className="search-form">
                  <input
                    type="search"
                    className="searchPage-search-input"
                    placeholder="도서 제목으로 리뷰 검색"
                    value={query}
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <button type="submit" className="search-button">
                    검색
                  </button>
                </form>
              </div>

              <NoResult bookTitle={urlQuery} />
            </>
          )}
          {!loading && searched && posts.length > 0 && (
            <div className="post-list">
              {posts.map((post) => (
                <Post
                  id={post.id}
                  key={post._id} // posts 배열에서 _id를 사용한다고 가정
                  _id={post._id}
                  userId={post.userId}
                  bookTitle={post.bookTitle}
                  bookAuthor={post.bookAuthor}
                  title={post.title}
                  text={post.text}
                  date={post.date}
                  name={post.name}
                  profilePhoto={post.profilePhoto}
                  likes={post.likes}
                  comments={post.comments}
                  isCommentVisible={activeCommentPostId === post._id} // 댓글 영역이 열려 있는지 여부 전달
                  onCommentToggle={handleCommentToggle} // 댓글 토글 핸들러 전달
                />
            ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostSearch;
