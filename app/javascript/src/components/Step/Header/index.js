import React from 'react';
import StepMenu from '../../../containers/StepMenu';
import Add from '../../SVG/Add';

export default ({setRef, idx, title, duplicateStep, isAFormOpen, isOpen, isDuplicate, deleteStep, ...props}) => (
  <div ref={setRef} {...props} className={isOpen ? `step_header color` : "step_header"}>
    {isDuplicate && <Add className="add_step_icon" />}
    <div className="step_header__text">{title}</div>
    {!isDuplicate && <StepMenu idx={idx} duplicateStep={duplicateStep} deleteStep={deleteStep} isFormOpen={isAFormOpen} />}
  </div>
)
