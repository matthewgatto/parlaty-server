import React,{useState,useEffect} from 'react';
import { useFormContext } from "react-hook-form"
import { useDispatch } from 'react-redux';
import ProcedureImage from '../components/ProcedureImage';
import { removeImage } from '../redux/actions/step';


const ProcedureImageLoader = props => {
  const [isLoading, setLoading] = useState(true)
  const handleLoad = () => setLoading(false)
  useEffect(() => {
    if(isLoading && props.image.src.complete) {
      setLoading(false)
    }
  }, [props.image, isLoading])
  return <ProcedureImage isLoading={isLoading} onLoad={handleLoad} {...props} />
}

export default (props) => {
  const { setValue } = useFormContext()
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(removeImage(props.image.id));
    setValue(`steps[${props.image.id}].image`, '');
  }
  return <ProcedureImageLoader image={props.image} onClick={remove} />
}
