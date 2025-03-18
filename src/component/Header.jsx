import styled from "styled-components";
import { Link } from "react-router-dom";
// import IcoSearch from "../assets/img/ico-search.png"

const Header = () => {

  return (
    <HeaderWrap>
      <Link to="/"><Logo /></Link>
      <Link to="/search"><SearchIcon /></Link>
    </HeaderWrap>
  )

}

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 10%;
  margin: 0 auto;
  column-gap: 10px;
  align-items: center;
`;

const Logo = styled.div`
  display: block;
  width: 100%;
  background-color: black;
`;

const SearchIcon = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  grid-column: 2/3;
  background-color: transparent;
  background: center right 10px / 24px url('/assets/img/ico-search.svg') no-repeat;
`;

export default Header;