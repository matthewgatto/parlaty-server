import React from 'react';

export default ({onChange, name, value, check, onClick, withoutChecked}) => (
  <input onChange={onChange} onClick={onClick} type="radio" name={name} value={check} checked={withoutChecked ? null : value === check } defaultChecked={value === check} />
)