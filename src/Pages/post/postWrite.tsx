import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postsSlice";
import "./component/postWrite.style.css";
import BookSearchDialog from "./bookSearchDialog";
import { AppDispatch, RootState } from "../../features/store";
import styled from "styled-components";

const Error = styled.div`
    color: red;
    margin-top: 15px;
    font-size: 14px;
`
const PostWrite: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [selectedBookAuthor, setSelectedBookAuthor] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const error = useSelector((state: RootState) => state.posts.error);
  
  const [selectedText, setSelectedText] = useState("");
  const [miniBarPosition, setMiniBarPosition] = useState({ top: 0, left: 0, visible: false });
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && text) {
        dispatch(
            createPost({
                title,
                text,
                bookTitle: selectedBookTitle,
                bookAuthor: selectedBookAuthor,
            })
        );
    } else {
        alert("모든 필수 정보를 입력해 주세요.");
    }
};

const handleTextSelection = (
  event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  const selectionStart = target.selectionStart;
  const selectionEnd = target.selectionEnd;

  if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
      const selectedText = target.value.substring(selectionStart, selectionEnd);
      setSelectedText(selectedText);

      // Create a temporary span to measure text width
      const span = document.createElement("span");
      const computedStyle = window.getComputedStyle(target);
      span.style.font = computedStyle.font;
      span.style.visibility = "hidden";
      span.style.whiteSpace = "pre";
      span.textContent = target.value.substring(0, selectionStart);
      document.body.appendChild(span);

      const textWidth = span.offsetWidth;
      document.body.removeChild(span);

      const { top, left } = target.getBoundingClientRect();
      const cursorTop = top + window.scrollY; // 필드의 상단 위치
      const cursorLeft = left + textWidth + 5 + window.scrollX; // 선택된 텍스트 바로 뒤 위치

      setMiniBarPosition({
          top: cursorTop,
          left: cursorLeft,
          visible: true,
      });
  } else {
      setMiniBarPosition((prev) => ({ ...prev, visible: false }));
  }
};

const handleMiniBarAction = (action: string, event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault(); // 기본 동작 방지
  event.stopPropagation(); // 클릭 이벤트가 다른 곳으로 전파되지 않도록 처리

  console.log(`${action}: ${selectedText}`);
  // 미니바 그대로 유지 & 선택 영역 유지
};

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
        onMouseUp={handleTextSelection} // 텍스트 드래그 후 이벤트 처리
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
        ></textarea>
        <button type="submit" className="submit-btn">
        작성하기
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
            }}
        >
            <button
                className="mini-bar-btn"
                onClick={(e) => handleMiniBarAction("AI 첨삭받기 1", e)}
            >
                AI 첨삭받기 1
            </button>
            <button
                className="mini-bar-btn"
                onClick={(e) => handleMiniBarAction("AI 첨삭받기 2",e)}
            >
                AI 첨삭받기 2
            </button>
            <button
                className="mini-bar-btn"
                onClick={(e) => handleMiniBarAction("AI 첨삭받기 3",e)}
            >
                AI 첨삭받기 3
            </button>
        </div>
    )}
</div>
);
};

export default PostWrite;
