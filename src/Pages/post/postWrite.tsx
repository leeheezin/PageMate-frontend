import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./post.style.css";
import BookSearchDialog from './bookSearchDialog';

const PostWrite: React.FC = () => {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBookTitle, setSelectedBookTitle] = useState('');
    const [selectedBookAuthor, setSelectedBookAuthor] = useState('');
    
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

    return (
        <div className='post-area'>
            <div className="form-container">
                <form>
                    <input type="text" placeholder="제목을 입력해 주세요" className="input-field" name="title" />
                    <input
                        type="text"
                        placeholder="책을 선택해 주세요"
                        value={selectedBookTitle}
                        onClick={openDialog}
                        className="input-field"
                        name="bookTitle"
                        readOnly
                    />
                    <textarea placeholder="내용을 입력해 주세요" className="textarea-field" name="content"></textarea>
                    <button type="submit" className="submit-btn">작성하기</button>
                </form>
            </div>
            {/* {isDialogOpen && <BookSearchDialog onClose={closeDialog} onSelect={handleSelectBook} />} */}
        </div>
    );
};

export default PostWrite;
