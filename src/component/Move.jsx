import { useState, useEffect } from "react";
import { GetDetailInfo } from "../server/GetPokeAPI";

const Move = ({url}) => {
  const [move, setMove] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await GetDetailInfo(url); // API 호출
        console.log(data);
        setMove(data);
      }
      catch (error) {
        console.error(error)
      } finally {
        // setLoading(false);
      }
    }
    getPosts();
  }, [])

  return (
    <div>
      {move && (
        <p>
          <span>
          {move.flavor_text_entries && move.flavor_text_entries.map((item) => (
            item.language.name === 'ko' && item.version_group.name === 'sword-shield' ? `${item.flavor_text}` : ""
          ))}
          </span>
        </p>
      )}
    </div>
  )
}

export default Move;