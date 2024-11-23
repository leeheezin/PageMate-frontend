import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../features/post/postsSlice";
import "./component/postWrite.style.css";
import "./component/gptModal.css";
import BookSearchDialog from "./bookSearchDialog";
import { AppDispatch, RootState } from "../../features/store";
import { styleChange, contentCorrection, spellingCorrection ,aiRequest } from "../../features/gpt/gptSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { TextareaSelectionBounds } from "textarea-selection-bounds";
import MiniBar from "./miniBar";
import MiniBarComponent from "./ai";
import styled from "styled-components";
import "./component/gptModal.css";
import "./component/postWrite.style.css";

const Error = styled.div`
    color: red;
    margin-top: 15px;
    font-size: 14px;
`;

// TextMeasurement 객체를 전역 변수로 생성

const PostWrite: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const postToEdit = location.state?.post;
    const [isEditMode, setIsEditMode] = useState(!!postToEdit);
    const [title, setTitle] = useState(postToEdit?.title || "");
    const [text, setText] = useState(postToEdit?.text || "");
    const [selectedBookTitle, setSelectedBookTitle] = useState(
    postToEdit?.bookTitle || "");
    const [selectedBookAuthor, setSelectedBookAuthor] = useState(
    postToEdit?.bookAuthor || "");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const error = useSelector((state: RootState) => state.posts.error);
    const [gptResultModal, setGptResultModal] = useState(false);    
    const gptResultText = useSelector((state: RootState) => state.gpt.gptResultText);       
    
    

    const [selectedText, setSelectedText] = useState("");
    const [miniBarPosition, setMiniBarPosition] = useState({
    top: 0,
    left: 0,
    visible: false,});
     // **토스트 메시지 상태 추가**
    const [isToastVisible, setIsToastVisible] = useState(false);
    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [selectionStart, setSelectionStart] = useState<number | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
    const [aiRequestText, setAiRequestText] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
      if(!user){
        navigate('/login');
      }
    }, []);
    

    useEffect(() => {
      if (postToEdit) {
      setIsEditMode(true);
      console.log("postToEditid", postToEdit.id);
      }
    }, [postToEdit]);

    // **토스트 메시지 타이머 관리**
    const showToast = () => {
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 7000); // 7초 후 메시지 숨김
    };

    // // 미니바가 열린 상태에서도 선택 범위를 유지
    // useEffect(() => {
    //   const handleClickOutside = (event: MouseEvent) => {
    //     const target = event.target as HTMLElement;

    // 미니바가 열린 상태에서도 선택 범위를 유지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        
        console.log("mini-bar", target.closest('.mini-bar')); 
        console.log("gpt-modal", target.closest('.gpt-modal'));
        console.log("mini-bar-input-row", target.closest('.mini-bar-input-row'));
        console.log("IsOverlayVisible", isOverlayVisible);

        if (
            target.closest('.mini-bar') || 
            target.closest('.gpt-modal') ||
            target.closest('.mini-bar-input-row')
        ) {
            setIsOverlayVisible(true);
            return;
        } else {
            setIsOverlayVisible(false);
            setMiniBarPosition((prev) => ({ ...prev, visible: false }));
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOverlayVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && text && selectedBookTitle) {
            try {
                if (isEditMode) {
                    await dispatch(
                        updatePost({
                            id: postToEdit._id,
                            title,
                            text,
                            bookTitle: selectedBookTitle,
                            bookAuthor: selectedBookAuthor,
                        })
                    ).unwrap();
                } else {
                    await dispatch(
                        createPost({
                            title,
                            text,
                            bookTitle: selectedBookTitle,
                            bookAuthor: selectedBookAuthor,
                        })
                    ).unwrap(); 
                }
                navigate("/"); 
            } catch (error) {
                console.error("Error while submitting post:", error);
                alert("게시글을 저장하는 중 문제가 발생했습니다.");
            }
        } else {
            alert("모든 필수 정보를 입력해 주세요.");
        }
    };
    

const handleTextSelection = (
  event: React.SyntheticEvent<HTMLTextAreaElement>
) => {
  const target = event.target as HTMLTextAreaElement;
  const start = target.selectionStart;
  const end = target.selectionEnd;

  if (start !== null && end !== null && start !== end) {
      const selectedText = target.value.substring(start, end);
      setSelectedText(selectedText);
      setSelectionStart(start);
      setSelectionEnd(end);
      setIsOverlayVisible(false);

      const bounds = new TextareaSelectionBounds(target);
      const coordinates = bounds.getBounds();

      // 텍스트 영역의 위치 및 스크롤 값 가져오기
      const textareaRect = target.getBoundingClientRect();
      const scrollTop = target.scrollTop;
      const scrollLeft = target.scrollLeft;
      console.log('coordinates:', coordinates);

      // 플랫폼의 너비 가져오기

      // 스크롤 값을 반영해 미니바 위치 조정
      if (window.innerWidth >= 481) {
        setMiniBarPosition({
          top:  coordinates.top + coordinates.height + window.scrollY -50, // 미니바 오프셋
          left:  coordinates.left < 200 ? textareaRect.left +  window.scrollX  : coordinates.left + coordinates.width + window.scrollX ,
          visible: true,
        });
      } else {
        setMiniBarPosition({
          top:  coordinates.top + coordinates.height + window.scrollY -50, // 미니바 오프셋
          left:  textareaRect.left +  window.scrollX ,
          visible: true,
        });
      }
  } else {
      setMiniBarPosition((prev) => ({ ...prev, visible: false }));
  }
    }

const openDialog = () => {
    setIsDialogOpen(true);
};

const closeDialog = () => {
    setIsDialogOpen(false);
};
const handleSelectBook = (bookTitle: string, bookAuthor: string) => {
    setSelectedBookTitle(bookTitle);
    setSelectedBookAuthor(bookAuthor);
    closeDialog();
};


  
// style, text 는 선택적 인자
const handleMiniBarAction = (action: string, style?: string, aiRequestText?: string) => {
  const review_object = {title:selectedBookTitle, author:selectedBookAuthor, review:selectedText};
  setIsLoading(true); // 로딩 시작
  if (action === "문체 변경" && style) {
    setGptResultModal(true);
    dispatch(styleChange({style:style,review_object:review_object})).finally(() => setIsLoading(false));
  } else if (action === "내용 첨삭") {
    setGptResultModal(true);
    dispatch(contentCorrection({review_object:review_object})).finally(() => setIsLoading(false));
  } else if (action === "맞춤법 교정") {
    setGptResultModal(true);
    dispatch(spellingCorrection({review_object:review_object})).finally(() => setIsLoading(false));
  } else if (action === "AI 요청" && aiRequestText) {
    setGptResultModal(true);
    dispatch(aiRequest({aiRequestText:aiRequestText,review_object:review_object })).finally(() => setIsLoading(false));
  }
  console.log(`${action}: ${selectedText}`);
};

const closeGptResultModal = () => {
  miniBarPosition.visible=false;
  setAiRequestText("");
  setGptResultModal(false);
  setIsDropdownOpen(false);
};

const applyGptResult = () => {
    if (selectionStart !== null && selectionEnd !== null) {
      const beforeText = text.substring(0, selectionStart);
      const afterText = text.substring(selectionEnd);
      const newText = beforeText + gptResultText + afterText;
      setText(newText);
    }
    miniBarPosition.visible=false;
    setAiRequestText("");
    setGptResultModal(false);
    setIsDropdownOpen(false);
    // 미니바 닫기
  };

useEffect(() => {
    if (!miniBarPosition.visible) {
        setIsDropdownOpen(false);
    }
}, [miniBarPosition.visible]);

return (
  <div className="post-area">
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <input
        ref={titleInputRef}
        type="text"
        placeholder="제목을 입력해 주세요"
        className="input-field"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // onMouseUp={handleTextSelection} // 텍스트 드래그 후 이벤트 처리
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault(); // 기본 탭 동작 막기
            openDialog(); // 다이얼로그 열기
            const bookInput = document.querySelector(
              'input[name="bookTitle"]'
            ) as HTMLInputElement;
            bookInput?.focus(); // 책 선택 칸으로 포커스 이동
          }
        }}
      />
      <input
        type="text" 
        placeholder="이곳을 클릭해서 책을 선택해주세요"
        value={selectedBookTitle}
        onClick={openDialog}
        className="input-field"
        name="bookTitle"
        readOnly
      />
          <div className="textarea-container">
            {isToastVisible && (
                <div className="toast-message">
                  <FontAwesomeIcon icon={faMagicWandSparkles} className="icon-margin" />
                    첨삭이 필요한 문장을 드래그하면 AI가 다듬어줘요!
                </div>
            )}
            <textarea
              id="post_textarea"
              ref={textAreaRef}
              placeholder="내용을 입력해 주세요"
              className={`textarea-field ${isOverlayVisible ? 'transparent' : ''}`}
              name="text"
              value={text}
              onChange={(e) => {
                if (!text) {
                  showToast(); // 처음 입력 시 토스트 메시지 표시
                }
                setText(e.target.value)
              }}
              onMouseUp={handleTextSelection}
              onSelect={handleTextSelection}
              onFocus={() => setIsOverlayVisible(false)}
            ></textarea>
            {isOverlayVisible && (
              <div className="textarea-overlay">
                <span>{text.substring(0, selectionStart!)}</span>
                <span className="highlighted">
                  {text.substring(selectionStart!, selectionEnd!)}
                </span>
                <span>{text.substring(selectionEnd!)}</span>
              </div>
            )}
          </div>
      <button type="submit" className="submit-btn">
      {isEditMode ? "수정하기" : "작성하기"}
      </button>
      {error && <Error>{error}</Error>}
    </form>
    
    </div>
    {isDialogOpen && (
    <BookSearchDialog onClose={closeDialog} onSelect={handleSelectBook} />
    )}
    {/* 미니 바 */}
    {miniBarPosition.visible && (
      <MiniBar
        miniBarPosition={miniBarPosition}
        handleMiniBarAction={handleMiniBarAction}
        aiRequestText={aiRequestText}
        setAiRequestText={setAiRequestText}
        applyGptResult={applyGptResult}
        closeGptResultModal={closeGptResultModal}
        gptResultText={gptResultText}
        isLoading={isLoading}
        gptResultModal={gptResultModal}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    )}
    
    {/* 미니 바 */}
    {/* { MiniBarComponent(miniBarPosition, handleMiniBarAction, aiRequestText, setAiRequestText, applyGptResult, closeGptResultModal, gptResultText, isLoading, gptResultModal,isDropdownOpen,setIsDropdownOpen)} */}
  </div>
);
};
export default PostWrite;
