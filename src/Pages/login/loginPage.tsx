import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import KakaoIcon from "../../assets/images/kakao_login_medium_narrow.png";
import GoogleIcon from "../../assets/images/web_light_sq_ctn@2x.png"
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { AppDispatch, RootState } from "../../features/store";
import {
  clearErrors,
  loginWithEmail,
  loginWithGoogle,
  loginWithKakao,
} from "../../features/user/userSlice";
import Logo from "../../assets/images/icon-logo1_big.png";
declare global {
  interface Window {
    Kakao: any;
  }
}
const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID;

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

  img {
    width: 88px;
    margin-right: 10px;
  }
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
  border: 1px solid #d4d4d4;
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
  border-bottom: 1px solid #d4d4d4;
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
  border-bottom: 1px solid #d4d4d4;
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
  /* 은서 변경 - 공통 스타일 */
  border-radius: 5px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #878787;
    box-shadow: 0 0 5px #ccc;
  }

  &::placeholder {
    color: #aaa;
    // font-style: italic;
  }

  &:focus::placeholder {
    color: transparent; /* 포커스 상태에서 placeholder 숨기기 */
  }
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
  width: 300px;
  padding-top: 25px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const GoogleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 100%;
  background-image: url(${GoogleIcon});
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-size: contain; /* 이미지 크기 조정 */
  background-position: center; /* 이미지 중앙 정렬 */
`;
const GoogleFakeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 100%;
  background-color: gray;
  opacity: 0;
`;
const Kakao = styled.div`
  height: auto;
  width: 300px;
  margin-top: 15px;
  display: flex;
  justify-content: center;

  button {
    display: flex; /* 플렉스박스를 사용하여 내용 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    height: 38px;
    overflow: hidden;
    width: 190px;
    border-radius: 5px;
    background-color: #fee500;
    border: 1px solid black;
    cursor: pointer;
  }
`;

const Login: React.FC = () => {
  const { loginError, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_JS_KEY}&redirect_uri=http://localhost:3000/login&response_type=code`;

  const handleEvent = (event: any) => {
    event.preventDefault();
    const { type, value } = event.target;
    if (type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData: any) => {
    dispatch(loginWithGoogle(googleData.credential));
  };
  const handleError = () => {
    console.log("Login Failed");
  };

  const handleKakaoLogin = () => {
    window.location.href = link;
  };

  useEffect(() => {
    if (loginError) {
      clearErrors();
    }
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code"); // 'code' 파라미터 값 추출
    if (code) {
      dispatch(loginWithKakao({ code }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login-page">
      <Container>
        <LoginArea>
          <Title>
            <img src={Logo} alt="Logo" />
            PageMate
          </Title>
          <LoginForm onSubmit={handleSubmit}>
            <LoginTitle>로그인</LoginTitle>
            <InputArea>
              <Input
                type="email"
                placeholder="아이디를 입력하세요."
                required
                onChange={handleEvent}
              />
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요."
                required
                onChange={handleEvent}
              />
              {loginError && (
                <ErrorMessage>
                  아이디 혹은 비밀번호가 일치하지 않습니다.
                </ErrorMessage>
              )}
              <Button type="submit">로그인</Button>
              <SignUp>
                계정이 없으신가요?{" "}
                <SignUpLink to="/signup">회원가입</SignUpLink>
              </SignUp>
            </InputArea>
            <Google>
              <GoogleOAuthProvider clientId={GOOGLE_ID || ""}>
                <GoogleContainer id="asdfasdf">
                  <GoogleFakeContainer>
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={handleError}
                      size="large"
                      width="50px"
                    />
                  </GoogleFakeContainer>
                </GoogleContainer>
              </GoogleOAuthProvider>
            </Google>
            <Kakao>
              <button type="button" onClick={handleKakaoLogin}>
                <img src={KakaoIcon}></img>
              </button>
            </Kakao>
          </LoginForm>
        </LoginArea>
      </Container>
    </div>
  );
};

export default Login;
