import { useState, useEffect } from "react";
import { GetDetailInfo } from "../server/GetPokeAPI";

const Abilities = ({url}) => {
  const [abillities, setAbilities] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await GetDetailInfo(url); // API 호출
        setAbilities(data);
      } catch (error) {
        console.error(error);
      } 
    };

    getPosts();
  }, [url]);

  return (
    <>
    {abillities && (
      <tr>
        <td>
          {abillities.names && abillities.names.map((item) => (
            item.language.name === 'ko' ? `${item.name}` : ""
          ))}
        </td>
        <td>
        {abillities.flavor_text_entries && abillities.flavor_text_entries.map((item) => (
          item.language.name === 'ko' && item.version_group.name === 'sword-shield' ? `${item.flavor_text}` : ""
        ))}
        </td>
      </tr>
    )}
    </>
  )
}

export default Abilities;