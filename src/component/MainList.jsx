import { useEffect, useState } from "react";
import { GetDetailFromId } from "../server/GetPokeAPI";
import { TypeE } from "../server/TransEnum";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import loadingSlice from "../store/loadingSlice";
import {ProfileFrontImg} from "./ProfileImg";

const MainList = ({id}) => {
  // const dispatch = useDispatch();
  const [pokeList, setPokeList] = useState(null)
  const [pokeListName, setPokeListName] = useState(null)

  useEffect(()=> {
    if (id) {
      async function fetchDetailData () {
        try {
          const responseAll = await GetDetailFromId(id);
          setPokeList(responseAll.response1);
          setPokeListName(responseAll.response2.names[2].name);
        } catch (error) {
          console.error(error);
        }
      }
      fetchDetailData();
    }
  }, [id]);

  
  // useEffect(() => {
  //   if(pokeList) {
  //     dispatch(loadingSlice.actions.stopLoding())
  //   }
  // }, [dispatch, pokeList, pokeListName]);


  return (
    <List>
      {pokeListName && pokeList && (
        <Link to={`/detail/${id}`} state={{ name: pokeListName }}>
          <No>No.{pokeList.id}</No>
          <Name>{pokeListName}</Name>
          <Img><ProfileFrontImg totalData={pokeList} alt={pokeListName}/></Img>
          <TypeWrap>
            {pokeList.types.map((item) => (
              <Type bgcolor={TypeE[item.type.name].color}>
                <TypeImg><img src={TypeE[item.type.name].img} alt="" /></TypeImg>
                <p>{TypeE[item.type.name].name}</p>
              </Type>
            ))}
          </TypeWrap>
        </Link>
      )}
    </List>
  )
}

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



export default MainList;