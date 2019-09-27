import React from 'react';
import AnimateHeight from 'react-animate-height';
import StepForm from '../StepForm';
import styles from './index.module.css';

const StepEditForm = ({isOpen}) =>
  <AnimateHeight height={isOpen ? 'auto' : 0} duration={400} className={styles.container}>
    <StepForm />
  </AnimateHeight>

export default StepEditForm;
