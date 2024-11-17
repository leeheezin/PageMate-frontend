import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features/post/postsSlice";
import "./post.style.css";
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
                // bookTitle: selectedBookTitle,
                // bookAuthor: selectedBookAuthor,
            })
        );
    } else {
        alert("모든 필수 정보를 입력해 주세요.");
    }
};


return (
<div className="post-area">
    <div className="form-container">
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="제목을 입력해 주세요"
        className="input-field"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        placeholder="내용을 입력해 주세요"
        className="textarea-field"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" className="submit-btn">
        작성하기
        </button>
        {error && <Error>{error}</Error>}
    </form>
    </div>
    {/* {isDialogOpen && (
    <BookSearchDialog onClose={closeDialog} onSelect={handleSelectBook} />
    )} */}
</div>
);
};

export default PostWrite;
