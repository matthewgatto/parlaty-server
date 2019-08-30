import React from 'react';
import ProcedureStep from '../../containers/ProcedureStep';
import Placeholder from '../Placeholder';
import styles from './index.module.css';

const ProcedureSteps = ({steps, onDragEnd, onDragOver, onDragStart}) => steps && steps.length ? (
  <div className={styles.list}>
    {steps.map((step, i) => <ProcedureStep key={i} idx={i} step={step} onDragOver={onDragOver} onDragStart={onDragStart} onDragEnd={onDragEnd} />)}
  </div>
) : <Placeholder text="This procedure currently has no steps" />

export default ProcedureSteps;
