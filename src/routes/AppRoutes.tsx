import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/home/homePage";
import Login from "../Pages/login/loginPage";
import PostDetail from "../Pages/detail/postDetail";
import SignUpPage from "../Pages/signUp/signUpPage";
import PostWrite from "../Pages/post/postWrite";
import MyPage from "../Pages/myPage/myPage";
import PostSearch from "../Pages/search/postSearch";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import PrivateRoute from "./privateRoute";

const AppRoutes: React.FC = () => {
    const handleSearch = (keyword: string) => {
        console.log("keyword", keyword);

    }
    const {user} = useSelector((state:RootState)=> state.user);
    const isAuthenticated = !!user;

    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/mypage" element={<MyPage/>} />
            <Route path="/search" element={<PostSearch/>} />
            <Route path="/post/write" element={<PostWrite/>} />
            <Route path="/post/:id" element={<PostDetail/>} />
        </Routes>
    );
}

export default AppRoutes;
