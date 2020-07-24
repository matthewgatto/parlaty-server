import React, { useState } from "react";
import {Input} from '@components/Inputs';

export default (props) => {
  const [indexes, setIndexes] = useState([...Array(props.initialLength).keys()]);
  const [counter, setCounter] = useState(props.initialLength);
  const addOemBusiness = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };
  const removeOemBusiness = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    const fieldName = `oem_businesses[${index}]`
    props.unregister(`${fieldName}.name`);
  };
  return indexes.map(i => <Input key={i} formKey={props.formKey} type="text" name={`oem_businesses[${i}].name`} register={props.register} />)
}
