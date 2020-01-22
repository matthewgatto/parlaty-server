import React from 'react';

export default (getValues, root) => {
  const values = getValues();
  return({
    title: values[`${root}title`],
    spoken: values[`${root}spoken`],
    note: values[`${root}note`],
    number: values[`${root}number`],
    time: values[`${root}time`],
    mode: values[`${root}mode`],
    safety: values[`${root}safety`],
    visual: values[`${root}visual`],
    audio: values[`${root}audio`],
    location: values[`${root}location`],
    device: values[`${root}device`],
    parameter_name: values[`${root}parameter_name`],
    parameter_value_8_pack: values[`${root}parameter_value_8_pack`]
  })
}
