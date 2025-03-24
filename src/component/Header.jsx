import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderSearchItem from "./HeaderSearchItem";

const Header = () => {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <HeaderWrap>
      <Link to="/"><Logo /></Link>
      <SearchInput><input type="text" onKeyUp={(e) => e.key === "Enter" ? setSearchInputValue(e.target.value) : ""} placeholder="검색"/></SearchInput>
      <SerachResults>
        <SerachResultsFloat>
          <HeaderSearchItem searhName={searchInputValue}/>
        </SerachResultsFloat>
      </SerachResults>
    </HeaderWrap>
  )

}

const HeaderWrap = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  display: grid;
  grid-template-columns: 10% 1fr;
  column-gap: 10px;
  align-items: center;
  padding-bottom: 20px;
  width: 100%;
`;

const Logo = styled.div`
  width: 100%; 
  height: 0;
  padding-bottom: 100%;
  background: center right 10px / 24px url('https://gowndll.github.io/pokemon/assets/img/ico-home.svg') no-repeat;
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

const SerachResults = styled.div`
  position: relative;
  grid-column: 2/3;
`;

const SerachResultsFloat = styled.div`
  position: absolute;
  top: 5px;
  left:0;
  right:0;
  z-index: 1000;
`;

export default Header;