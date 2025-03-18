import { useState, useEffect, useRef } from "react";
import { GetPokeAPI } from "../server/GetPokeAPI";
import { useDispatch,useSelector } from "react-redux";
import MainList from "../component/MainList";
import styled from "styled-components";
import loadingSlice from "../store/loadingSlice";
import Loading from "../component/Skeletone";
import OnIntersection from "../component/OnIntersection";
import Header from "component/Header";

const Main = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pokeDataId, setPokeDataId] = useState([]);
  const isLoadings = useSelector((state) => state.loading.isLoading );
  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    dispatch(loadingSlice.actions.startLoding());

    async function fetchData() {
      try {
        const response = await GetPokeAPI.get('/pokemon/', {params: {offset: 30*page, limit: 30}});
        const results = response.data.results;
        const id = results.map((result) => {
          return result.url.split("/").slice(-2, -1).toString();
        });
        setPokeDataId((prev)=> [...new Set([...prev, ...id])]);
        
      } catch (error) {
        console.error(error)
      } finally {
      }
    }

    fetchData();
  }, [page, dispatch]);

  return (
    <>
      <Header/>
      <Loading count={15}/>
      <MainWrap>
        {pokeDataId?.map((item, index) => (
          <MainList id={item} key={index}/> 
        ))}
      </MainWrap>
      <OnIntersection onIntersect={() => setPage((prev) => prev + 1)} loading={isLoadings}/>
    </>
  )
}

const MainWrap = styled.ul`
  padding: 10px 0;
`;

export default Main;