import React,{useState,useEffect} from 'react';

export default (src) => {
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if(isLoading && src.complete) {
      setLoading(false)
    }
  }, [src, isLoading])
  return {isLoading, onLoad: () => setLoading(false)}
}
