import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
    author: string;
    text: string;
}

interface Post {
    id: number;
    bookTitle: string;
    content: string;
    date: string;
    author: string;
    profilePhoto: string;
    likes: number;
    comments: Comment[];
}

interface PostsState {
    posts: Post[];
    loading: boolean; 
}

const initialState: PostsState = {
    posts: [
        {
            id: 1,
            bookTitle: "제목 1",
            content: "포스트 내용 1",
            date: "2024-11-15 10:30",
            author: "작성자 1",
            profilePhoto: "profile-image-url.jpg",
            likes: 5,
            comments: [
                { author: "사용자1", text: "정말 유익해요!" },
                { author: "사용자2", text: "좋은 정보 감사합니다." },
            ],
        },
        {
            id: 2,
            bookTitle: "제목 2",
            content: "포스트 내용 2",
            date: "2024-11-15 11:00",
            author: "작성자 2",
            profilePhoto: "profile-image-url.jpg",
            likes: 3,
            comments: [{ author: "사용자3", text: "재미있어요!" }],
        },
        {
            id: 3,
            bookTitle: "제목 3",
            content: "포스트 내용 3",
            date: "2024-11-15 11:30",
            author: "작성자 3",
            profilePhoto: "profile-image-url.jpg",
            likes: 8,
            comments: [{ author: "사용자4", text: "유용한 정보예요." }],
        },
        {
            id: 4,
            bookTitle: "제목 4",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 5,
            bookTitle: "제목 5",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
        {
            id: 6,
            bookTitle: "제목 6",
            content: "포스트 내용 4",
            date: "2024-11-15 12:00",
            author: "작성자 4",
            profilePhoto: "profile-image-url.jpg",
            likes: 10,
            comments: [{ author: "사용자5", text: "훌륭합니다!" }],
        },
    ],
    loading: false, 
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        addPost(state, action: PayloadAction<Post>) {
            state.posts.push(action.payload);
        },
    },
});

export const { startLoading, stopLoading, addPost } = postsSlice.actions;
export default postsSlice.reducer;
