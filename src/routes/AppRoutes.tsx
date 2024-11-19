import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/home/homePage";
import Login from "../Pages/login/loginPage";
import PostDetail from "../Pages/detail/postDetail";
import SignUpPage from "../Pages/signUp/signUpPage";
import PostWrite from "../Pages/post/postWrite";
import MyPage from "../Pages/myPage/myPage";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import PrivateRoute from "./privateRoute";

const AppRoutes: React.FC = () => {
    const {user} = useSelector((state:RootState)=> state.user);
    const isAuthenticated = !!user;

    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            {/* <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> */}
                <Route path="/" element={<HomePage/>} />
                <Route path="/mypage" element={<MyPage/>} />
                <Route path="/post/write" element={<PostWrite/>} />
                <Route path="/post/:id" element={<PostDetail/>} />    
            {/* </Route> */}
        </Routes>
    );
}

export default AppRoutes;
