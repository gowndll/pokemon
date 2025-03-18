import { useState, useEffect } from "react";
import { GetDetailInfo } from "../server/GetPokeAPI";

const Characteristic = ({url}) => {
  const [characteristic, setCharacteristic] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await GetDetailInfo(url); // API 호출
        // console.log(data);
        setCharacteristic(data);
      }
      catch (error) {
        console.error(error)
      } finally {
        // setLoading(false);
      }
    }
    getPosts();
  }, [url])

  return (
    <div>
      {characteristic && (
        <p>
          {characteristic.descriptions.map((item) => (
            item.language.name === "ko" ? `${item.description}` : ''
          ))}
        </p>
      )}
    </div>
  )
}

export default Characteristic;