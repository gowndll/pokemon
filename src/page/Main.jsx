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

const Main = () => {
  const [totalData, setTotalData] = useState(null);

  const defaultData = useQuery({
    queryKey: ['defaultData'],
    queryFn: pokemonDefaultData,
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if(defaultData) {
      setTotalData(defaultData.data);
    }
    
  }, [defaultData])

  if(defaultData.isLoading) return <Loading/>;

  return (
    <>
      <Header/>
      <MainWrap>
        {totalData?.map((data, index) => (
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
      </MainWrap>
      {/* <OnIntersection onIntersect={() => setPage((prev) => prev + 1)}/> */}

      
    </>
  )
}

const MainWrap = styled.ul`
  overflow: auto; 
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  
`;

const List = styled.li`
  padding: 20px;
  background-color: rgba(255,255,255,0.8);
  border-radius: 10px;
  img {max-width:100%;}
  & + & {
    margin-top: 10px;
  }
  & > a {
    display: grid;
    grid-template-columns: 1fr 40%;
    justify-content: center;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    min-height:100px;
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