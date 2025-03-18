import { useEffect, useRef } from "react";
import styled from "styled-components";

const OnIntersection = ({onIntersect, loading}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onIntersect();
        }
      },
      {threshold: 1}
    );

    const delay = setTimeout(()=> {
    if(targetRef.current) {
        observer.observe(targetRef.current)
      }
    }, 3000)
    

    return () => {
      clearTimeout(delay);
      observer.disconnect();
    }

  }, [onIntersect, loading]);

  return (
    <>
    {!loading && (
      <More ref={targetRef}>
        <Img><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/25.png" alt="" /></Img>
        <p>로딩 중..</p>
      </More>
    )}
    </>
  )
}

const More = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #777;
  font-family: 'Galmuri9', sans-serif;
  padding: 10px 0;
`;

const Img = styled.div`
  animation: more 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  @keyframes more {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default OnIntersection;