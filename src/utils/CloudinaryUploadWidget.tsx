import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "";
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET || "";

interface CloudinaryUploadWidgetProps {
  uploadImage: (url: string) => void;
}

const ActionButton = styled.button`
  padding: 9px;
  border-radius: 5px;
  text-align: start;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background: transparent;

  &:hover {
    background: #e2e6ea;
  }
`;

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  uploadImage,
}) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Cloudinary 위젯 생성 (한 번만 생성)
    if (!widgetRef.current) {
      widgetRef.current = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: CLOUDNAME,
          uploadPreset: UPLOADPRESET,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const uploadedImageUrl = result.info.secure_url;
            uploadImage(uploadedImageUrl); // 부모 컴포넌트로 이미지 URL 전달
          }
        }
      );
    }
  }, [uploadImage]);

  const handleClick = () => {
    widgetRef.current.open(); // 위젯 열기
  };

  return <ActionButton onClick={handleClick}>프로필 수정</ActionButton>;
};

export default CloudinaryUploadWidget;
