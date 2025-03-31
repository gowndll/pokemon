import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Abilities = ({url}) => {
  const [abillities, setAbilities] = useState(null);

  const abilityData = useQuery({
    queryKey: [`ability_${url}`],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if(abilityData.data) {
      setAbilities(abilityData.data);
    }

  }, [abilityData.data]);

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