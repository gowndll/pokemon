import { useEffect, useState } from "react";


export const ProfileFrontImg = ({totalData, alt}) => {
  const Gif = totalData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
  const Png = totalData["sprites"]["front_default"];
  const [finalImg, setFinalImg] = useState(null);

  useEffect(()=> {
    Gif ? setFinalImg(Gif) : setFinalImg(Png)
  }, [Gif, Png])

  return (
    <img src={finalImg} alt={alt}/>
  )
}

export const ProfileBackImg = ({totalData, alt}) => {
  const Gif = totalData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["back_default"];
  const Png = totalData["sprites"]["back_default"];
  const [finalImg, setFinalImg] = useState(null);

  useEffect(()=> {
    Gif ? setFinalImg(Gif) : setFinalImg(Png)
  }, [Gif, Png])

  return (
    <img src={finalImg} alt={alt}/>
  )
}