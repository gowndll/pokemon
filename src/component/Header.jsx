import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import HeaderSearchItem from "./HeaderSearchItem";

const Header = ({isOpenModalClick}) => {
  const location = useLocation();
  const [searchInputValue, setSearchInputValue] = useState("");

  const refreshClickEvent = () => {
    if(location.pathname === '/') {
      window.location.reload();
    }
  }

  return (
    <HeaderWrap>
      <Logo><Link to="/" onClick={refreshClickEvent}></Link></Logo>
      {location.pathname === '/' && <SearchButton><input type="button" value="" onClick={isOpenModalClick}/></SearchButton>}
      <SearchInput>
        <input type="text" onChange={(e) => setSearchInputValue(e.target.value)} placeholder="검색"/>
        <SerachResults className="sibling">
          <SerachResultsFloat>
            <HeaderSearchItem searchName={searchInputValue}/>
          </SerachResultsFloat>
        </SerachResults>
      </SearchInput>
    </HeaderWrap>
  )

}

const HeaderWrap = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  align-items: center;
  padding-bottom: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr 50%;
`;

const Logo = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
  width: 149px;
  height: 67px;
  background: center / contain url('https://gowndll.github.io/pokemon/assets/img/logo.png') no-repeat;
  margin: 0 auto 50px;
  & > a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const SearchButton = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  & > input[type="button"] {
    width: 48px;
    height: 48px;
    border:0;
    background: center / 20px url('https://gowndll.github.io/pokemon/assets/img/ico-equalizer.svg') no-repeat;
    cursor: pointer;
  }
`;

const SearchInput = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
  &:focus-within .sibling {
    display: block;
  }

  & > input[type="text"] {
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

  @media screen and (max-width: 780px) {
    grid-column: 2/4;
  }
`;

const SerachResults = styled.div`
  position: relative;
  display: none;
`;

const SerachResultsFloat = styled.div`
  position: absolute;
  top: 5px;
  left:0;
  right:0;
  z-index: 1000;
`;

export default Header;