import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GoogleLogin  from './component/google';
import Logo from "../../assets/images/icon-logo1_big.png"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import { clearErrors, loginWithEmail } from '../../features/user/userSlice';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
`;
const LoginArea = styled.div`
    height: 600px;
    width: 980px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;
const Title = styled.div`
    width: 960px;
    height: 100px;
    display: flex;
    justify-content: center;
    font-size: 50px;
    font-weight: 700;
    padding-bottom: 12px;

    @media (max-width: 768px) {
        img {
            margin-left: 10px;
            width: 60px;
            height: 60px;
            margin-right: 10px;
        }
        font-size: 32px; 
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
`;
const LoginForm = styled.form`
    width: 500px;
    height: 500px;
    padding: 24px;
    border: 1px solid #D4D4D4;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 20px;

    @media (max-width: 768px) {
        width: 100%;
        background-color: transparent;
        border: none;
    }
`;
const LoginTitle = styled.div`
    width: calc(100% - 100px);
    height: 55px;
    border-bottom: 1px solid #D4D4D4;
    font-size: 30px;
    font-weight: 600;
    
    @media (max-width: 768px) {
        width: 100%;
        display: none;
    }
`;
const InputArea = styled.div`
    width: calc(100% - 100px);
    padding-top: 25px;
    border-bottom: 1px solid #D4D4D4;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;
const Input = styled.input`
    width: 100%;
    margin-bottom: 12px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
`;
const ErrorMessage = styled.div`
    color: red;
    width: 100%;
`;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #014421;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    margin-top: 12px;
    cursor: pointer;

    &:hover {
        background-color: #01351a;
    }
`;
const SignUp = styled.div`
    font-weight: 600;
    width: 100%;
    padding: 17px;
    text-align: center;
`;
const SignUpLink = styled(Link)`
    color: #014421;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
const Google = styled.div`
    height: auto;
    width: calc(100% - 100px);
    padding-top: 25px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;
    

const Login: React.FC = () => {
    const {loginError, user} = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEvent = (event:any) => {
        event.preventDefault();
        const {type, value} = event.target
        if (type === "email") {
            setEmail(value);
        }
        else{
            setPassword(value);
        }
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        dispatch(loginWithEmail({email, password}));
    }

    useEffect(() => {
        if(loginError){
            clearErrors()
        }
    },[dispatch])

    useEffect(() => {
        if(user){
            // navigate("/signup")
        }
    },[user])

    return (
        <Container>
            <LoginArea>
                <Title><img src={Logo} alt="Logo"/>PageMate</Title>
                <LoginForm onSubmit={handleSubmit}>
                    <LoginTitle>로그인</LoginTitle>
                    <InputArea>
                        <Input type='email' placeholder='아이디를 입력하세요.' required onChange={handleEvent}/>
                        <Input type='password' placeholder='비밀번호를 입력하세요.' required onChange={handleEvent}/>
                        {/* <ErrorMessage>아이디 혹은 비밀번호를 확인해 주세요</ErrorMessage> */}
                        <Button type='submit'>로그인</Button>
                        <SignUp>계정이 없으신가요? <SignUpLink to="/signup">회원가입</SignUpLink></SignUp>
                    </InputArea>
                    <Google>
                        <GoogleLogin></GoogleLogin>
                    </Google>
                </LoginForm>
            </LoginArea>
        </Container>
    );
};

export default Login;