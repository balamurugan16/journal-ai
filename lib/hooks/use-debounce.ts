import { useState, useEffect } from "react"

function useDebounce<T>(data: T, interval: number) {
  const [liveData, setLiveData] = useState(data)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = setTimeout(() => {
        setLiveData(data);
      }, interval);
      return () => {
        clearTimeout(handler)
      }
    }
  }, [data, interval])

  return liveData;
}

export default useDebounce;

