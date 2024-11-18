import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    overflow: hidden;
`;

const Spinner: React.FC = () => (
    <SpinnerContainer>
        <ClipLoader size={40} />
    </SpinnerContainer>
);

export default Spinner;
