import styled from "styled-components";


const Loading = () => {
  return (
    <LoadingWrap>
      <Img><img src="https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif" alt="" /></Img>
      <ProgressContainer>
        <Progressbar />
      </ProgressContainer>
      
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height:60vh;
`;

const Img = styled.div`
  max-width: 60px;
  margin: 0 auto 20px;
  & > img {
    max-width: 100%;
  }
`;

const Text = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 160px;
  height: 10px;
  border-radius: 10px;
  background-color: #d1d1d1;
  border: 2px solid #fff;
  overflow: hidden;
`;

const Progressbar = styled.div`
  height: 100%;
  background-color: #ffbf00;
  transition: width 0.3s;
  animation: loading 1s ease-in-out forwards;

  @keyframes loading {
    0% {
      width: 50%;
    }
    100% {
      width: 100%;
    }
  }
`;

export default Loading;