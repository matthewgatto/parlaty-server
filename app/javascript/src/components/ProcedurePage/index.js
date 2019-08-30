import React from 'react';
import AddButton from '../AddButton';
import ProcedureForm from '../ProcedureForm';
import ProcedureSteps from '../../containers/ProcedureSteps';
import ProcedureImages from '../../containers/ProcedureImages';
import SubmitButton from '../../containers/SubmitButton';
import StepAddForm from '../../containers/StepAddForm';
import AddStepButton from '../../containers/AddStepButton';
import Well from '../Well';
import Text from '../Text';
import styles from './index.module.css';
import procedure from '../../assets/images/procedure.png';

const ProcedurePage = () =>
  <>
    <Well className={styles.banner}>
      New Procedure
    </Well>
    <div className={styles.container}>
      <div className={styles.padding}>
        <div className={styles.wrapper}>
          <AddButton text="Create New Procedure" />
          <ProcedureForm />
          <AddStepButton />
          <img src={procedure} className={styles.image} />
        </div>

      </div>
      <div>
        <Text className={styles.margin} color="secondary">Procedure Steps</Text>
        <StepAddForm />
        <ProcedureSteps />
      </div>
      <div>
        <Text className={styles.margin} color="secondary">Uploaded Imagery</Text>
        <ProcedureImages />
        <SubmitButton text="Submit" />
      </div>
    </div>
  </>

export default ProcedurePage;
