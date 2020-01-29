import React from 'react';
import Bar from '../Bar';
import StepMenu from '@containers/StepMenu';

export default ({idx, title, duplicateStep, isAFormOpen, isOpen, isDuplicate, deleteStep, ...props}) => (
  <Bar
    {...props}
    color={isOpen}
    text={title}
    addIcon={isDuplicate}
    right={!isDuplicate && <StepMenu idx={idx} duplicateStep={duplicateStep} deleteStep={deleteStep} isFormOpen={isAFormOpen} />}
  />
)
