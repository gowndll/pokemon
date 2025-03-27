import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { pokemonDefaultData } from "server/FetchPosts";
import ProfileName from "./ProfileName";
import { ProfileFrontImg } from "./ProfileImg";
import styled from "styled-components";
import { Link } from "react-router-dom";


const HeaderSearchItem = ({searchName}) => {
  const [searchItem, setSearchItem] = useState(null);

  const defaultData = useQuery({
    queryKey: ['defaultData'],
    queryFn: pokemonDefaultData,
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  //값 value와 순서 비교하는 로직
  const checkInOrder = (input, word) => {
    let index = 0;
    return [...word].reduce((found, char) => {
      if (char === input[index]) index++;
      return index === input.length ? true : found;
    }, false);
  }

  useEffect(() => {
    if(defaultData.data && searchName) {
      const textFilter = defaultData.data.map((dataItem) => {
        const textKoFilter = dataItem.names.filter((nameItemm) =>  nameItemm.language.name === "ko");
        if(checkInOrder(searchName, textKoFilter[0].name)) {
          return dataItem;
        }
      });
      const finalfilter = textFilter.filter((item) => item)
      setSearchItem(finalfilter);
    } else if (!searchName) {
      setSearchItem(null);
    }
  }, [defaultData.data, searchName]);
  
  return (
    <SearchItemList>
      {searchItem?.map((item) => (
        <Link to={`/detail/${item.id}`} state={{ name: item.name }}>
          <No>No.{item.id}</No>
          <Name><ProfileName names={item.names}/></Name>
          <Img><ProfileFrontImg totalData={item} alt={item.name}/></Img>
        </Link>
      ))}
    </SearchItemList>
  )
}

const SearchItemList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  & > a {
    background-color: #fff;
    border-radius: 3px;
    padding: 10px;
    display: flex;
    align-items: center;
    column-gap: 5px;
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
  font-size: 14px;
  color: #111;
  font-family: 'Galmuri9', sans-serif;
`;

const Img = styled.div`
  width: 24px;
  & > img {
    width: 100%;
  }
`;

export default HeaderSearchItem;