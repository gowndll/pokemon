import { useState, useEffect } from "react";
import { GetDetailInfo } from "../server/GetPokeAPI";

const Stat = ({url}) => {
  const [stat, setStat] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await GetDetailInfo(url); // API 호출
        setStat(data);
      }
      catch (error) {
        console.error(error)
      } 
    }
    getPosts();
  }, [url])

  return (
    <>
      {stat && (
        stat.names && stat.names.map((item) => (
          item.language.name === 'ko' ? `${item.name}` : ""
        ))
      )}
    </>
  )
}

export default Stat;