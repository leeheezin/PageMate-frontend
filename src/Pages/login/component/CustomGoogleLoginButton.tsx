import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

// Props 타입 정의
interface CustomGoogleLoginButtonProps {
  onSuccess: (credentialResponse: any) => void; // 로그인 성공 시 실행할 함수
  onError?: () => void; // 로그인 실패 시 실행할 함수 (옵션)
}

const CustomGoogleLoginButton: React.FC<CustomGoogleLoginButtonProps> = ({
  onSuccess,
  onError,
}) => {
  const googleLogin = useGoogleLogin({
    onSuccess,
    onError: onError || (() => console.error("Google Login Failed")), // 기본 에러 처리
  });

  return (
    <button
      style={{
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        backgroundColor: "#4285F4", // Google의 대표 색상
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s",
      }}
      onClick={() => googleLogin()} // 버튼 클릭 시 Google 로그인 트리거
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "#357AE8") // Hover 색상 변경
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "#4285F4") // 기본 색상 복원
      }
    >
      Google로 로그인하기
    </button>
  );
};

export default CustomGoogleLoginButton;
