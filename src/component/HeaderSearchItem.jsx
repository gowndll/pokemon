import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { pokemonDefaultData } from "server/FetchPosts";
import ProfileName from "./ProfileName";
import { ProfileFrontImg } from "./ProfileImg";
import styled from "styled-components";
import { Link } from "react-router-dom";


const HeaderSearchItem = ({searhName}) => {
  const [searchItem, setSearchITem] = useState(null);

  const defaultData = useQuery({
    queryKey: ['defaultData'],
    queryFn: pokemonDefaultData,
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if(defaultData.data && searhName) {
      const names = defaultData.data.filter((dafaultItem) => dafaultItem.names.some((dafaultItemName => dafaultItemName.name === searhName)));
      setSearchITem(names[0]);
    }
    
  }, [defaultData.data, searhName])
  
  return (
    <SearchItemList>
      {searchItem && (
        <Link to={`/detail/${searchItem.id}`} state={{ name: searchItem.name }}>
          <No>No.{searchItem.id}</No>
          <Name><ProfileName names={searchItem.names}/></Name>
          <Img><ProfileFrontImg totalData={searchItem} alt={searchItem.name}/></Img>
        </Link>
      )}
    </SearchItemList>
  )
}

const SearchItemList = styled.div`
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