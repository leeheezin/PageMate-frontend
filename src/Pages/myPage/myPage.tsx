import React from "react";
import styled from "styled-components";
import { ReactComponent as ModifyIcon } from "../../assets/images/icon-more-vertical.svg";

const Container = styled.div`
    max-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;
const MyPageArea = styled.div`
  width: 960px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;   
  border: 1px solid black;

`;
const ProfileArea = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;
const Photo = styled.div`
    margin-left: 10%;
    height: 120px;
    width: 120px;
    border: 1px solid black;
    border-radius: 120px;

`
const Info = styled.div`
    width: calc(75% - 120px);
    padding-left: 20px;
    height: 120px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const UserName = styled.div`
    font-size: 40px;
    font-weight: 500;
`
const Summary = styled.div`
    color: #014421;
    font-size: 24px;
    font-weight: 700;
`
const Modify = styled.div`
    margin-right: 10%;
    width: 5%;
    height: 120px;
    border: 1px solid black;    
    display: flex;
    justify-content: end;
`
const Bnt = styled.button`
    height: 40px;
    width: 40px;
    border: none;
    background-color: transparent;
`
const PostArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Filter = styled.div`
    width: 80%;
    margin: 0 10% 0 10%;
    border: 1px solid black;
    height: 40px;
`
const FilterBtn = styled.button`
    height: 100%;
    width: 100px;
    border: none;
    color:white;
    background-color: #014421;
    border-radius: 5px;
`
const MyPage: React.FC = () => {
  return (
    <Container>
      <MyPageArea>
        <ProfileArea>
            <Photo></Photo>
            <Info>
                <UserName>asdf</UserName>
                <Summary>asdf</Summary>
            </Info>
            <Modify>
                <Bnt>
                    <ModifyIcon/>
                </Bnt>
            </Modify>
        </ProfileArea>
        <PostArea>
            <Filter>
                <FilterBtn>asdf</FilterBtn>
                <FilterBtn>asdf</FilterBtn>
            </Filter>
        </PostArea>
      </MyPageArea>
    </Container>
  );
};

export default MyPage;
