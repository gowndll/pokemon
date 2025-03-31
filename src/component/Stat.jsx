import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Stat = ({url}) => {
  const [stat, setStat] = useState(null);

  const statData = useQuery({
    queryKey: [`stat_${url}`],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if(statData.data) {
      setStat(statData.data);
    }

  }, [statData.data]);

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