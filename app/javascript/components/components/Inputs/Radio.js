import React from 'react';

export default ({onChange, name, value, check}) => (
  <input onChange={onChange} type="radio" name={name} value={check} checked={value === check} />
)
