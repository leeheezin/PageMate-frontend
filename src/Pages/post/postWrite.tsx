import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../features/post/postsSlice";
import "./component/postWrite.style.css";
import "./component/gptModal.css";
import BookSearchDialog from "./bookSearchDialog";
import { AppDispatch, RootState } from "../../features/store";
import styled from "styled-components";
import { styleChange, contentCorrection, spellingCorrection ,aiRequest } from "../../features/gpt/gptSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import getCaretCoordinates from 'textarea-caret';

import { useNavigate, useLocation } from "react-router-dom";

const Error = styled.div`
    color: red;
    margin-top: 15px;
    font-size: 14px;
`;

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
    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [selectionStart, setSelectionStart] = useState<number | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
    const [aiRequestText, setAiRequestText] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (postToEdit) {
        setIsEditMode(true);
        console.log("postToEditid", postToEdit.id);
        }
    }, [postToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && text) {
        if (isEditMode) {
            console.log("Submitting update for post with ID:", postToEdit._id);
            dispatch(
            updatePost({
                id: postToEdit._id,
                title,
                text,
                bookTitle: selectedBookTitle,
                bookAuthor: selectedBookAuthor,
            })
            );
            console.log("Dispatching update with post ID:", postToEdit.id);
        } else {
            dispatch(
            createPost({
                title,
                text,
                bookTitle: selectedBookTitle,
                bookAuthor: selectedBookAuthor,
            })
            );
        }
        navigate("/");
        } else {
        alert("모든 필수 정보를 입력해 주세요.");
    };
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

      // 커서 좌표 계산
      const coordinates = getCaretCoordinates(target, start);

      // 텍스트 영역의 위치
      const textareaRect = target.getBoundingClientRect();

      setMiniBarPosition({
          top: textareaRect.top + coordinates.top + window.scrollY - 30, // 오프셋 조정
          left: textareaRect.left + coordinates.left + window.scrollX,
          visible: true,
      });
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
  setGptResultModal(false);
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

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('post-area')) {
            setIsDropdownOpen(false);
            setMiniBarPosition((prev) => ({ ...prev, visible: false }));
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

useEffect(() => {
    if (!miniBarPosition.visible) {
        setIsDropdownOpen(false);
    }
}, [miniBarPosition.visible]);

const GptResultModal = ({gptResultText, isLoading}:{gptResultText:string, isLoading: boolean}) => (
  <div
    className="gpt-modal"
    style={{
      position: 'absolute',
      top: `${miniBarPosition.top + 60}px`, // miniBarPosition 바로 아래에 위치
      left: `${miniBarPosition.left}px`,
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    }}
  >
    <div className="gpt-modal-content">
      {isLoading ? (
        <div className="loading-spinner">로딩 중...</div>
      ) : (
        <>
          <textarea
            className="gpt-modal-textarea" 
            value={gptResultText}
            readOnly
          ></textarea>
          <div className="gpt-modal-buttons">
            <button className="gpt-apply-btn" onClick={applyGptResult}>
              적용하기
            </button>
            <button className="gpt-cancel-btn" onClick={closeGptResultModal}>
              취소
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

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
        />
        <input
        type="text" 
        placeholder="책을 선택해 주세요"
        value={selectedBookTitle}
        onClick={openDialog}
        className="input-field"
        name="bookTitle"
        readOnly
        />
        <textarea
        ref={textAreaRef}
        placeholder="내용을 입력해 주세요"
        className="textarea-field"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onMouseUp={handleTextSelection} // 텍스트 드래그 후 이벤트 처리
        onSelect={handleTextSelection} // 키보드로 텍스트 선택 시 이벤트 처리
        ></textarea>
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
        <div
            className="mini-bar"
            style={{
                top: `${miniBarPosition.top}px`,
                left: `${miniBarPosition.left}px`,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className="mini-bar-row">
                <input
                    type="text"
                    className="mini-bar-input"
                    placeholder="AI에게 요청 내용"
                    value={aiRequestText}
                    onChange={(e) => setAiRequestText(e.target.value)}
                />
                <button
                    className="mini-bar-btn"
                    onClick={() => handleMiniBarAction("AI 요청", undefined, aiRequestText)}
                >
                    요청하기
                </button>
            </div>
            <div className="mini-bar-row">
                <button
                    className="mini-bar-btn"
                    onClick={toggleDropdown}
                >
                    문체 변경 <FontAwesomeIcon icon={faChevronDown} />
                </button>

                <button
                    className="mini-bar-btn"
                    onClick={() => handleMiniBarAction("내용 첨삭")}
                >
                    내용 첨삭
                </button>
                <button
                    className="mini-bar-btn"
                    onClick={() => handleMiniBarAction("맞춤법 교정")}
                >
                    맞춤법 교정
                </button>
            </div>
        </div>
    )}
    {isDropdownOpen && (
    <div className="mini-bar"
            style={{
                top: `${miniBarPosition.top+120}px`,
                left: `${miniBarPosition.left}px`,
                display: 'flex',
                flexDirection: 'column',
            }}>
        <button
            className="mini-bar-btn2"
            onClick={() => handleMiniBarAction("문체 변경", "구어체")}
        >
            구어체
        </button>
        <button
            className="mini-bar-btn2"
            onClick={() => handleMiniBarAction("문체 변경", "문어체")}
        >
            문어체
        </button>
        <button
            className="mini-bar-btn2"
            onClick={() => handleMiniBarAction("문체 변경", "격식체")}
        >
            격식체
        </button>
    </div>
)}

    {/* 모달 창 표시 */}
    {gptResultModal && <GptResultModal gptResultText={gptResultText} isLoading={isLoading} />}
</div>
);
};
export default PostWrite;
