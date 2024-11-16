import styled from "styled-components";

const Wrap = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.h1`
    width: 100%;
    margin: 0;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
`;

const Logo = styled.img`
    width: 50px; 
    height: auto; 
    margin-bottom: 20px; 
`;

const Header: React.FC = () => {
    return (
        <Wrap>
            <Logo src="/logo1.png" alt="책 로고" /> 
            <Title>PageMate</Title>
        </Wrap>
    );
};

export default Header;
