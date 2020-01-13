import React from 'react';

export default (getValues, root) => {
  const values = getValues();
  return({
    title: values[`${root}title`],
    number: values[`${root}number`],
    time: values[`${root}time`],
    mode: values[`${root}mode`],
    skip: values[`${root}skip`],
    image: values[`${root}image`],
    audio: values[`${root}audio`],
    location: values[`${root}location`],
    device: values[`${root}device`],
    parameter: values[`${root}parameter`]
  })
}
