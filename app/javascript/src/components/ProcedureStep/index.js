import React from 'react';
import ActionWell from '../ActionWell';
import StepMenu from '../../containers/StepMenu';
import StepEditForm from '../../containers/StepEditForm';
import styles from './index.module.css';

const ProcedureStep = ({idx, step, toggleMenu, openForm, isOpen, setRef}) =>
  <>
  <ActionWell
    setRef={setRef}
    text={step.title}
    className={styles.container}
    onClick={openForm}
    rightIcon={
      <>
        <svg onClick={toggleMenu} className={styles.burger} width="1.2em" height="1.2em" viewBox="0 0 179 146">
          <line stroke="#8c8c8c" strokeWidth="8" x1="0" y1="4" x2="179" y2="4"/>
          <line stroke="#8c8c8c" strokeWidth="8" x1="0" y1="142" x2="179" y2="142"/>
          <line stroke="#8c8c8c" strokeWidth="8" x1="0" y1="73" x2="179" y2="73"/>
        </svg>
        {isOpen && <StepMenu idx={idx} />}
      </>
    }
  />
  <StepEditForm id={step.id} />
  </>

export default ProcedureStep;
