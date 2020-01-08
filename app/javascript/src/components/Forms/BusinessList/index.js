import React, { useState } from "react";
import {Input} from '../Login';

export default (props) => {
  const [indexes, setIndexes] = useState([...Array(props.initialLength).keys()]);
  const [counter, setCounter] = useState(props.initialLength);
  const addBusiness = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };
  const removeBusiness = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    const fieldName = `businesses[${index}]`
    props.unregister(`${fieldName}.name`);
  };
  return indexes.map(i => <Input key={i} formKey={props.formKey} type="text" name={`businesses[${i}].name`} register={props.register} />)
}
