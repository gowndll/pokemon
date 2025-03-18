import styled from "styled-components";
import { useSelector } from "react-redux";


const Loading = ({count = 5}) => {
  const isLoadings = useSelector((state) => state.loading.isLoading );

  if(!isLoadings) return null;
  return (
    <SkeletoneWrap>
      {Array.from({length : count}).map((_, index) => (
        <Skeletone key={index}>
          <SkeletoneNum><SkeletoneBar /></SkeletoneNum>
          <SkeletoneName><SkeletoneBar /></SkeletoneName>
          <SkeletoneCicle />  
          <SkeletoneType>
            <SkeletoneBar />
            <SkeletoneBar />
          </SkeletoneType> 
        </Skeletone>
      ))}
    </SkeletoneWrap>
  );
}

const SkeletoneWrap = styled.div`
`;

const Skeletone = styled.div`
  display: grid;
  grid-template-columns: 1fr 40%;
  grid-template-rows: auto 1fr auto auto;
  padding: 10px;
  row-gap: 5px;
  background-size: 130% 130%;
  background-color: rgb(239 239 239);
  border-radius: 10px;
  overflow: hidden;
  opacity: 0.6;
  & + & {
    margin-top: 10px;
  }
`;

const SkeletoneNum = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`;

const SkeletoneName = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  width: 50%;
`;

const SkeletoneBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #d3d3d3;
  border-radius: 5px;
`;

const SkeletoneCicle = styled.div`
  grid-column: 2/3;
  grid-row: 1/4;
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  background-color: #d3d3d3;
  border-radius:100%;
  margin: 5% auto;
`;

const SkeletoneType = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
  display: flex;
  column-gap: 5px;
`;

export default Loading;