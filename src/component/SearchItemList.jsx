import { useState, useEffect } from "react";
import styled from "styled-components";
import { GetPokeAPI } from "server/GetPokeAPI";
import useDebounce from "server/useDebounce";
import { TypeE } from "server/TransEnum";
import { Link } from "react-router-dom";
import {ProfileFrontImg} from "./ProfileImg";

const SearchItemList = ({id, searchValue, onSelectedValue}) => {
  const [searchDetailData, setSearchDetailData] = useState(null);
  const [searchDetailName, setSearchDetailName] = useState(null);
  const debouncedSearch = useDebounce(searchValue, 1000);

  useEffect(()=> {
    async function fetchSearchDeatilData() {
      try {
        const responseName = await GetPokeAPI.get(`pokemon-species/${id}`);
        const responseNameData = responseName.data;
        const hasName = responseNameData.names.some((item) => item.name === searchValue);
        const hasNameData = hasName ? responseNameData : null;
        setSearchDetailName(hasNameData);

        if (!hasName) {
          onSelectedValue(false);
          return;
        }

        const responseItem = await GetPokeAPI.get(`pokemon/${id}`);
        const hasNameAllData = responseItem.data;
        setSearchDetailData(hasNameAllData);
        onSelectedValue(true);
      } catch (error) {
        console.error(error)
      } finally {
      }
    }

    if (debouncedSearch) {
      fetchSearchDeatilData();
    }
  }, [debouncedSearch, id, searchValue]);

  return (
    <>
      {searchDetailData && searchDetailName && (
        <SearchCard>
          <Link to={`/detail/${id}`}>
            <No>No.{searchDetailData.id}</No>
            {searchDetailName.names.map((item, index) => (
              item.language.name === 'ko' ? <Name key={index}>{item.name}</Name> : '' 
            ))}
            <Img><ProfileFrontImg totalData={searchDetailData} /></Img>
            <TypeWrap>
              {searchDetailData.types.map((item) => (
                <Type bgcolor={TypeE[item.type.name].color}>
                  <TypeImg><img src={TypeE[item.type.name].img} alt="" /></TypeImg>
                  <p>{TypeE[item.type.name].name}</p>
                </Type>
              ))}
            </TypeWrap>
          </Link>
        </SearchCard>
      )}
      
    </>
  )
}

const SearchCard = styled.div`
  background-color: rgba(255,255,255,0.8);
  border-radius: 10px;
  padding: 20px;

  & + & {
    margin-top: 10px;
  }
  & > a {
    display: grid;
    grid-template-columns: 1fr 40%;
    justify-content: center;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    min-height: 100px;
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
  & > img {
    max-width: 100%;
  }
`;


export default SearchItemList;