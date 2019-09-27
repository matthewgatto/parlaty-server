import React from 'react';
import ActionWell from '../ActionWell';
import StepMenu from '../../containers/StepMenu';
import StepEditForm from '../../containers/StepEditForm';
import styles from './index.module.css';

const ProcedureStep = ({idx, step, openForm, ...rest}) =>
  <>
  <ActionWell
    text={step.title}
    className={styles.container}
    onClick={openForm}
    rightIcon={<StepMenu idx={idx} />}
    {...rest}
  />
  <StepEditForm id={step.id} />
  </>

export default ProcedureStep;
