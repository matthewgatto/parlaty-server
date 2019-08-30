import React from 'react';
import ActionWell from '../ActionWell';
import StepMenu from '../../containers/StepMenu';
import styles from './index.module.css';

const ProcedureStep = ({idx, step, onDragStart, onDragEnd, onDragOver, onClick, isOpen, setRef}) =>
  <ActionWell
    setRef={setRef}
    text={step.title}
    className={styles.container}
    draggable
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDragEnd={onDragEnd}
    onClick={onClick}
    rightIcon={isOpen ? <StepMenu idx={idx} /> : null}
  />

export default ProcedureStep;
