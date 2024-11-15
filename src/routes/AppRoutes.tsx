import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/home/homePage";
import Login from "../Pages/login/loginPage";
import PostDetail from "../Pages/detail/postDetail";
import SignUpPage from "../Pages/signUp/signUpPage";
import PostWrite from "../Pages/post/postWrite";
import MyPage from "../Pages/myPage/myPage";
import PostSearch from "../Pages/search/postSearch";

const AppRoutes: React.FC = () => {
    const handleSearch = (keyword: string) => {
        console.log("keyword", keyword);

    }
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/mypage" element={<MyPage/>} />
            <Route path="/search" element={<PostSearch onSearch={handleSearch}/>} />
            <Route path="/post/write" element={<PostWrite/>} />
            <Route path="/post/:id" element={<PostDetail/>} />
        </Routes>
    );
}

export default AppRoutes;
