import styled from "styled-components";


const Empty = ({text}) => {

  return(
    <EmptyWrap>
      <Img><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/25.png" alt="" /></Img>
      <p>{text}</p>
    </EmptyWrap>
  )
}

const EmptyWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 14px;
`;

const Img = styled.div`
  animation: more 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  margin-bottom: 10px;
  @keyframes more {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default Empty;

