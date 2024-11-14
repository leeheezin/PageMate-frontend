import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import Login from "../pages/loginPage";
import PostDetail from "../pages/postDetail";
import SignUpPage from "../pages/signUpPage";
import PostWrite from "../pages/postWrite";
import MyPage from "../pages/myPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/mypage" element={<MyPage/>} />
            <Route path="/post/write" element={<PostWrite/>} />
            <Route path="/post/:id" element={<PostDetail/>} />
        </Routes>
    );
}

export default AppRoutes;
