import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import "./component/postWrite.style.css";
import BookSearchDialog from './bookSearchDialog';

const PostWrite: React.FC = () => {

    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    useEffect(()=>{
    })

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    

    return (
        <div className='.post-area'>
            
            <div className="form-container">
                <form>
                    <input type="text" placeholder="제목을 입력해 주세요" className="input-field" name="title" />
                    <input
                        type="text"
                        placeholder="책을 선택해 주세요"
                        onClick={openDialog}
                        className="input-field"
                        readOnly
                        />
                    <textarea placeholder="내용을 입력해 주세요" className="textarea-field" name="content"></textarea>
                    <button type="submit" className="submit-btn">작성하기</button>
                </form>
            </div>
            {isDialogOpen && <BookSearchDialog onClose={closeDialog} />}
        </div>
    );
};

export default PostWrite;
