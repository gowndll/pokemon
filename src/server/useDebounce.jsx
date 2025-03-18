import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, seDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      seDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }


  }, [value, delay])

  return debouncedValue;
}

export default useDebounce;