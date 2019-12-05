import React from 'react';
import StepFields from '../../containers/StepFields';
import StepLabel from '../../containers/StepLabel';

export default function({idx, id, steps, arrayHelpers, ...rest}){
  return(
    <>
      <StepLabel id={id} idx={idx} arrayHelpers={arrayHelpers} {...rest} />
      <StepFields idx={idx} arrayHelpers={arrayHelpers} steps={steps} />
    </>
  )
}
