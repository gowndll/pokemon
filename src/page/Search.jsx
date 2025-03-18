import styled from "styled-components";
import { useState, useEffect } from "react";
import { GetPokeAPI } from "server/GetPokeAPI";
import SearchItemList from "component/SearchItemList";
import loadingSlice from "store/loadingSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "component/Empty";


const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchAllId, setSearchId] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
  }

  useEffect(()=> {
    dispatch(loadingSlice.actions.startLoding());

    async function fetchSearchData() {
      try {
        const response = await GetPokeAPI.get('/pokemon/', {params: {limit: 3}});
        const results = response.data.results;
        const id = results.map((result) => {
          return result.url.split("/").slice(-2, -1).toString();
        });
        setSearchId((prev)=> [...new Set([...prev, ...id])]);
      } catch (error) {
        console.error(error)
      } finally {
        console.log('done')
      }
    }
    fetchSearchData();
    }, [dispatch])

  return (
    <SearchWrap>
      <SearchHeader>
        <Link to="/"><Logo /></Link>
        <SearchInput><input type="text" onKeyUp={(e) => e.key === "Enter" ? setSearchInputValue(e.target.value) : ""} placeholder="검색"/></SearchInput>
      </SearchHeader>
      
      <SearchItemListWrap>
        {searchInputValue && searchAllId?.map((item, index) => (
          <SearchItemList id={item} key={index} searchValue={searchInputValue} onSelectedValue={handleValueChange}/> 
        ))}
        {searchInputValue && !selectedValue && (
          <Empty text={`검색한 포켓몬 데이터가 없습니다`} />
        )}
        {!searchInputValue && (
          <Empty text={`원하는 포켓몬을 검색해보세요`} />
        )}
      </SearchItemListWrap>
    </SearchWrap>
  )
}

const SearchWrap = styled.div`
`;

const SearchHeader = styled.div`
 display: grid;
 grid-template-columns: 10% 1fr;
 margin-bottom: 20px;
`;

const Logo = styled.div`
  width: 100%; 
  height: 0;
  padding-bottom: 100%;
  background: center right 10px / 24px url('/assets/img/ico-home.svg') no-repeat;
`;

const SearchInput = styled.div`
  & > input {
    width: 100%;
    border:0;
    background-color: #fff;
    border-radius: 5px;
    height: 100%;
    padding: 10px;
    font-size: 16px; 
    font-family: 'Galmuri9', sans-serif;
    color: #333;
  };

`;

const SearchItemListWrap = styled.div`
  height: calc(100vh - 450px)
`;



export default SearchPage;