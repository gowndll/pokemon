import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Loading from "../component/Skeletone";
import OnIntersection from "../component/OnIntersection";
import Header from "component/Header";
import { Link } from "react-router-dom";
import { TypeE } from "server/TransEnum";

import { useQuery} from "@tanstack/react-query";
import { pokemonDefaultData } from "server/FetchPosts";
import { ProfileFrontImg } from "component/ProfileImg";
import ProfileName from "component/ProfileName";
import Modal from "react-modal";

Modal.setAppElement("#root"); 

const Main = () => {
  const [totalData, setTotalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedItems, setTempSelectedItems] = useState([]);
  const [typeArray, setTypeArray] = useState(null);
  const [noData, setNoData] = useState(false);

  const defaultData = useQuery({
    queryKey: ['defaultData'],
    queryFn: pokemonDefaultData,
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  const handleModalEvent = () => {
    setIsOpen(true);
  }

  const calcFilterEvent = (e) => {
    const {value, checked} = e.target;
    if(checked) {
      setTempSelectedItems([...tempSelectedItems, value])
    } else {
      setTempSelectedItems(tempSelectedItems.filter((item) => item !== value))
    }
  }

  const saveFilterEvent = () => {
    const matchFilterData = defaultData.data.filter((item) => {
      const somecalc = item.types.some((dummy, idx) => {
        const calcResults = tempSelectedItems.includes(dummy.type.name);
        return calcResults;
      })
      if (somecalc) return item;
    })

    if(matchFilterData.length > 0) {
      setTotalData(matchFilterData);
      setNoData(false);
    } else {
      if (tempSelectedItems.length === 0) {
        setTotalData(defaultData.data);
        setNoData(false);
      } else {
        setTotalData([]);
        setNoData(true);
      }
    }

    setIsOpen(false);
  }

  useEffect(() => {
    if(defaultData.data) {
      setTotalData(defaultData.data);
    }

    const transTypeToArray = Object.entries(TypeE).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    setTypeArray(transTypeToArray);
  }, [defaultData.data])

  if(defaultData.isLoading) return <Loading/>;

  return (
    <>
      <Header isOpenModalClick={handleModalEvent}/>
      <MainWrap>
        {noData && (
          <NoDataList>
            <p>데이터가 없습니다.</p>
          </NoDataList>
        )}
        {!noData && totalData?.map((data, index) => (
          <List>
            <Link to={`/detail/${data.id}`} state={{ name: data.name }}>
              <No>No.{data.id}</No>
              <Name><ProfileName names={data.names}/></Name>
              <Img><ProfileFrontImg totalData={data} alt={data.name}/></Img>
              <TypeWrap>
                {data.types.map((item) => (
                  <Type bgcolor={TypeE[item.type.name].color}>
                    <TypeImg><img src={TypeE[item.type.name].img} alt="" /></TypeImg>
                    <p>{TypeE[item.type.name].name}</p>
                  </Type>
                ))}
              </TypeWrap>
            </Link>
          </List>
        ))}
        <StyledModal isOpen={isOpen} overlayElement={(props, contentElement) => (
          <Overlay onClick={()=>setIsOpen(false)}><StopPropagation onClick={(e) => e.stopPropagation()}>{contentElement}</StopPropagation></Overlay>
        )}>
          <ModalHeader><h2>필터</h2></ModalHeader>
          <ModalContents>
            <FilterWrap>
              {typeArray?.map((item, idx) => (
                <TypeLabel key={idx} bg={item.color}>
                  <input type="checkbox" name="type" value={item.id} onChange={(e) => calcFilterEvent(e)} checked={tempSelectedItems.includes(item.id)} hidden/>
                  <p>{item.name}</p>
                </TypeLabel>
              ))}
            </FilterWrap>
          </ModalContents>
          <ModalFooter>
            <ModalBtn onClick={() => saveFilterEvent()}>저장</ModalBtn>
          </ModalFooter>
        </StyledModal>
      </MainWrap>
      {/* <OnIntersection onIntersect={() => setPage((prev) => prev + 1)}/> */}
    </>
  ) 
}

const ModalBtn = styled.button`
  border: 0;
  min-width: 120px;
  font-size: 16px;
  font-family: 'Galmuri9', sans-serif;
  padding: 5px 0 6px;
  cursor: pointer;
`;

const TypeLabel = styled.label`
  flex: 1 0 calc(20% - 4px);
  max-width: calc(20% - 4px);
  cursor: pointer;
  & > p {
    padding: 3px;
    background-color: ${({bg}) => bg};
    color: #fff;
    text-align: center;
    border: 2px solid transparent;
    font-size: 14px;
    font-family: 'Galmuri14', sans-serif;
  }

  & input:checked + p {
    border-color: black;
  }
`;

const NoDataList = styled.div`

`;

const StopPropagation = styled.div`
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom:0;
  background-color: rgba(0,0,0,0.6);
`;

const StyledModal = styled(Modal)`
  position: fixed;
  left: 50%; 
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 450px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const ModalContents = styled.div`

`;
const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const MainWrap = styled.ul`
  overflow: auto; 
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  
`;

const List = styled.li`
  padding: 20px;
  background-color: rgba(255,255,255,0.8);
  border-radius: 10px;
  img {max-width:100%;}
  & > a {
    display: grid;
    grid-template-columns: 1fr 40%;
    justify-content: center;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height:100px;
  }
`;

const No = styled.p`
  grid-column: 1/2;
  grid-row: 1/2;
  font-size: 10px;
  color: #777;
  font-family: 'Galmuri14', sans-serif;
`;

const Name = styled.p`
  grid-column: 1/2;
  grid-row: 2/3;
  font-size: 16px; 
  font-family: 'Galmuri9', sans-serif;
  color: #333;
  margin-bottom: 10px;
`;

const Img = styled.div`
  grid-column: 2/3;
  grid-row: 1/4;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const TypeWrap = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
  display: flex;
  align-items: center;
  column-gap: 3px;
  width: 140px;
`;

const Type = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex:1 0 50%;
  max-width: 50%;
  column-gap: 5px;
  text-align: left;
  padding: 3px 3px 4px;
  font-size: 12px;
  border-radius: 3px;
  color:#fff;
  line-height: 1;
  background-color: ${({ bgcolor }) => bgcolor};
`;

const TypeImg = styled.div`
  width: 16px;
`;

export default Main;