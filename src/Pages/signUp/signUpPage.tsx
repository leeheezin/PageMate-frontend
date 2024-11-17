import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../../assets/images/icon-logo1_big.png"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;

`;
const SignUpArea = styled.div`
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
const SignUpForm = styled.form`
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
const SignUpTitle = styled.div`
    width: calc(100% - 100px);
    height: 55px;
    border-bottom: 1px solid #D4D4D4;
    font-size: 30px;
    font-weight: 600;
    
    @media (max-width: 768px) {
        display: none;
    }
`;
const InputArea = styled.div`
    width: calc(100% - 100px);
    padding-top: 25px;
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
`
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
`
const SignUpLink = styled(Link)`
    color: #014421;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
const Google = styled.div`
    height: auto;
    width: calc(100% - 100px);
    padding-top: 25px;
`;
    
const SignUpPage: React.FC = () => {
    return (
        <Container>
            <SignUpArea>
                <Title><img src={Logo} alt="Logo"/><div>PageMate</div></Title>
                <SignUpForm>
                    <SignUpTitle>회원가입</SignUpTitle>
                    <InputArea>
                        <Input type='email' placeholder='아이디를 입력하세요.' required/>
                        <Input type='nickName' placeholder='이름을 입력하세요.' required/>
                        <Input type='password' placeholder='비밀번호를 입력하세요.' required/>
                        <Input type='password' placeholder='비밀번호를 재입력하세요.' required/>
                        {/* <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage> */}
                        <Button type='submit'>회원가입</Button>
                        <SignUp>이미 계정이 있으신가요? <SignUpLink to="/login">로그인</SignUpLink></SignUp>
                    </InputArea>
                </SignUpForm>
            </SignUpArea>
        </Container>
    );
};

export default SignUpPage;
