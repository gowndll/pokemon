import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { GetDetailFromId } from "../server/GetPokeAPI";
import Abilities from "../component/Abilities";
import Stat from "../component/Stat";
import { TypeE } from "../server/TransEnum";
import { ProfileFrontImg, ProfileBackImg } from "component/ProfileImg";
import styled from "styled-components";

const Detail = () => {
  const params = useParams();
  const [pokeList, setPokeList] = useState(null);
  const [pokeListSpecies, setPokeListSpecies] = useState(null);
  const cryAudio = useRef();

  useEffect(()=> {
    if (params.id) {
      async function fetchDetailData () {
        try {
          const responseAll = await GetDetailFromId(params.id);
          setPokeList(responseAll.response1);
          setPokeListSpecies(responseAll.response2);
        } catch (error) {
          console.error(error);
        }
      }
      fetchDetailData();
    }
  }, [params.id])

  return(
    <DetailWrap>
      <Link to="/"><Logo /></Link>
      {pokeListSpecies && (
      <>
        <No>No. {pokeListSpecies.id}</No>
        {pokeListSpecies.names.map((item) => (
          item.language.name === 'ko' ? <Name>{item.name}</Name> : '' 
        ))}
        {pokeListSpecies.flavor_text_entries.map((item) => (
          item.language.name === 'ko' && item.version.name === "omega-ruby" ? <Info>{item.flavor_text}</Info> : '' 
        ))}
      </>
      )}
    {pokeList && (
      <>
        <TypeWrap>
          {pokeList.types.map((item) => (
            <Type bgcolor={TypeE[item.type.name].color}>
              <TypeImg><img src={TypeE[item.type.name].img} alt="" /></TypeImg>
              <p>{TypeE[item.type.name].name}</p>
            </Type>
          ))}
        </TypeWrap>
        <Img>
          <ProfileFrontImg totalData={pokeList}/>
          <ProfileBackImg totalData={pokeList}/>
        </Img>
        <Cry>
          <audio ref={cryAudio} src={pokeList.cries.latest} controls autoPlay></audio>
          <CryControl onClick={()=> cryAudio.current.play()}></CryControl>
        </Cry>
        <InfoTable>
          <colgroup>
            <col style={{width: 30 + '%'}}/>
            <col style={{width: 70 + '%'}}/>
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={2}>세부정보</th>
            </tr>
            <tr>
              <td>키</td>
              <td>{pokeList.height}cm</td>
            </tr>
            <tr>
              <td>몸무게</td>
              <td>{pokeList.weight}g</td>
            </tr>
            <tr>
              <th colSpan={2}>능력</th>
            </tr>
            {pokeList.abilities?.map((item) => (
              <Abilities url={item.ability.url}/>
            ))}
            <tr>
              <th colSpan={2}>종족치</th>
            </tr>
            {pokeList.stats?.map((item) => (
              <tr>
                <td><Stat url={item.stat.url}/></td>
                <td>{item.base_stat}</td>
              </tr>
            ))}
          </tbody>
        </InfoTable>
        
      </>
    )}
  </DetailWrap>)
}

const DetailWrap = styled.div`
  position: relative;
  height: 100%;
  padding: 20px;
  background-color: rgba(255,255,255,0.7);
  border-radius: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Logo = styled.div`
  width:10%; 
  height: 0;
  padding-bottom: 10%;
  background: center / 24px url('/assets/img/ico-home.svg') no-repeat;
`;

const No = styled.p`
  padding: 10px 0 0 0;
  font-size: 14px;
  color: #777;
  font-family: 'Galmuri14', sans-serif;
`;

const Name = styled.p`
  font-size: 26px; 
  font-family: 'Galmuri9', sans-serif;
  color: #111;
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
  word-break: keep-all;
`;

const Img = styled.div`
  margin: 20px auto;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  justify-content: end;
`;

const TypeWrap = styled.div`
  margin: 10px 0;
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

const Cry = styled.div` 
  height: 0;
  & > audio { 
    visibility: hidden;
    height: 0;
  }
`;

const CryControl = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 0;
  cursor: pointer;
  background: center / contain url('/assets/img/ico-play.svg') no-repeat;
`;

const InfoTable = styled.table`
  border-collapse: collapse;
  background-color: #fff;
  width: 100%;

  tr {
    border: 1px solid #555;
  }

  th {
    padding: 5px;
    font-size: 15px;
    font-weight: normal;
    background-color: #d9d9d9;
    word-break: keep-all;
  }

  td {
    padding: 5px 8px;
    font-size: 14px;
    line-height: 1.3;
    word-break: keep-all;
  }

  td:nth-child(1) {
    background-color: #d9d9d9;
    border-right: 1px solid #555;
    text-align: center;
  }
`;


export default Detail;