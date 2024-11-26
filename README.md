# PageMate Frontend

PageMate는 **책 도서 리뷰 SNS** 플랫폼으로, 사용자들이 도서를 평가하고, 리뷰를 공유할 수 있는 서비스입니다. 인스타그램처럼 사용자가 게시글을 작성하고, 다른 사람들과 좋아요 및 댓글로 소통할 수 있는 기능을 제공합니다. 본 프로젝트는 **React**와 **OpenAI GPT-4 API**를 활용하여 게시글 작성시 AI기능을 제공합니다.

## 주요 기능

1. **맞춤법 교정 및 문체 변경**  
   OpenAI API를 이용한 맞춤법 교정과 문체 변경 기능을 제공하여 사용자가 작성한 글을 더욱 자연스럽게 만듭니다.

2. **내용 첩삭**  
   AI를 활용하여 보완할 내용, 빼야 할 내용 등을 자동으로 첨삭합니다. 글 작성 후, 전반적인 수정 작업을 AI가 도와줍니다.

3. **무한 스크롤 및 게시글 작성/수정/삭제**  
   메인 페이지에서 무한 스크롤 기능을 구현하여, 사용자가 계속해서 새로운 게시글을 볼 수 있습니다.  
   사용자는 게시글을 작성, 수정, 삭제할 수 있습니다.

4. **베스트셀러 불러오기 및 책 검색**  
   베스트셀러 책 목록을 불러오기와 책 검색 기능을 제공합니다.  
   사용자는 책을 검색하고, 해당 책에 대한 리뷰를 작성할 수 있습니다.

5. **댓글 기능**  
   게시글에 대해 댓글을 작성하고 삭제할 수 있는 기능을 제공합니다.

---

## 사용된 기술 스택

- **Frontend**: React, SRedux Toolkit, styled Components, TypeScript
- **Backend**: Express, MongoDB, Mongoose
- **API**: OpenAI API (GPT-4), Axios
- **기타**: 무한 스크롤

---

## 프로젝트 시작하기

### 1. 리포지토리 클론
```bash
git clone https://github.com/leeheezin/PageMate-frontend.git
cd PageMate-frontend
npm install
npm start
```
### 2. 개발 서버 실행
```bash
npm start
```

#### 기능 구현
내가 맡은 기능 - 
메인 페이지, 게시글 퍼블리싱
무한 스크롤 구현
게시글 작성/수정/삭제 기능 구현
좋아요 기능 구현
다이얼로그 퍼블리싱
---
로그인, 회원가입, 마이페이지 기능 구현
페이지 퍼블리싱: 회원가입, 로그인, 마이페이지
OpenAI Completion API 및 Few-shot Learning 테스트
검색 API 구현
글 작성 페이지 퍼블리싱
책 검색 페이지 퍼블리싱
베스트셀러 불러오기 기능 구현
책 검색 기능 구현
댓글 작성 및 삭제 기능 구현