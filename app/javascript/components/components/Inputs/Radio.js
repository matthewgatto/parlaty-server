import React from 'react';

export default ({onChange, name, value, check, onClick}) => {
  console.log('checked', value, check, value === check);
  return(
  <input onChange={onChange} onClick={onClick} type="radio" name={name} value={check} checked={value === check} />
)}
