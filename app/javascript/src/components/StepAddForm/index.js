import React from 'react';
import AnimateHeight from 'react-animate-height';
import AddButton from '../AddButton';
import StepForm from '../StepForm';
import styles from './index.module.css';

const StepAddForm = ({isOpen, closeForm}) =>
  <AnimateHeight height={isOpen ? 'auto' : 0} duration={400} className={styles.container}>
    <AddButton text="New Step" />
    <StepForm />
  </AnimateHeight>

export default StepAddForm;
