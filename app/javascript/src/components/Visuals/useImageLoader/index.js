import React,{useState,useEffect,useRef} from 'react';

export default (src) => {
  const img = useRef(new Image());
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    img.current.onload = () => setLoading(false)
  },[])
  useEffect(() => {
    setLoading(true)
    img.current.src = src;
  }, [src])
  return isLoading
}
