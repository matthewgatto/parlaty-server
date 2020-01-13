import React,{useState,useEffect} from 'react';
import ProcedureImage from '../components/ProcedureImage';

export default (props) => {
  const [isLoading, setLoading] = useState(true)
  const handleLoad = () => setLoading(false)
  useEffect(() => {
    if(isLoading && props.image.src.complete) {
      setLoading(false)
    }
  }, [props.image, isLoading])
  return <ProcedureImage isLoading={isLoading} onLoad={handleLoad} {...props} />
}
