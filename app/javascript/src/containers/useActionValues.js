import React from 'react';

export default (getValues, root) => {
  const values = getValues();
  return({
    name: values[`${root}name`],
    parameter_name: values[`${root}parameter_name`],
    parameter_value_8_pack: values[`${root}parameter_value_8_pack`]
  })
}
