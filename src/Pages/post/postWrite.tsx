import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../features/post/postsSlice";
import "./component/postWrite.style.css";
import "./component/gptModal.css";
import BookSearchDialog from "./bookSearchDialog";
import { AppDispatch, RootState } from "../../features/store";
import { styleChange, contentCorrection, spellingCorrection ,aiRequest } from "../../features/gpt/gptSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import getCaretCoordinates from 'textarea-caret';
import { useNavigate, useLocation } from "react-router-dom";
import miniBar from "./ai";
import MiniBarComponent from "./ai";
import styled from "styled-components";
import "./component/gptModal.css";
import "./component/postWrite.style.css";


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

      // 텍스트 영역의 위치 및 스크롤 값 가져오기
      const textareaRect = target.getBoundingClientRect();
      const scrollTop = target.scrollTop;
      const scrollLeft = target.scrollLeft;

      // 스크롤 값을 반영해 미니바 위치 조정
      setMiniBarPosition({
        top:
          textareaRect.top +
          coordinates.top -
          scrollTop +
          window.scrollY -
          30, // 오프셋 조정
        left:
          textareaRect.left +
          coordinates.left -
          scrollLeft +
          window.scrollX,
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



useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('post-area')) {
            setIsDropdownOpen(false);
            setMiniBarPosition((prev) => ({ ...prev, visible: false }));
        }

        // 'mini-bar-input' 클래스에 대해서는 드래그 상태를 유지하면서 입력 가능하게 함
        if (
            target.classList.contains('mini-bar') ||
            target.classList.contains('mini-bar-btn') ||
            target.classList.contains('mini-bar-row') ||
            target.classList.contains('mini-bar-btn2')
        ) {
            event.preventDefault();
        }

        // if (target.classList.contains('mini-bar-input')) {
        //     if (textAreaRef.current && selectionStart !== null && selectionEnd !== null) {
        //         textAreaRef.current.setSelectionRange(selectionStart, selectionEnd);
        //     }
        // }
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
      { MiniBarComponent(miniBarPosition, handleMiniBarAction, aiRequestText, setAiRequestText, applyGptResult, closeGptResultModal, gptResultText, isLoading, gptResultModal,isDropdownOpen,setIsDropdownOpen)}

</div>
);
};
export default PostWrite;
