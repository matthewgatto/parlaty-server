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
import Polygon from '../PolygonV';
import styles from './index.module.css';

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
          <div className={styles.polygonContainer}>
            <Polygon className={styles.polygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.4em" />
            <Polygon className={styles.polygonTwo} fill="#67318d" stroke="#67318d" size="1.2em" />
            <Polygon className={styles.polygonThree} fill="none" stroke="#67318d" size="2.5em" />
            <Polygon className={styles.polygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.2em" />
          </div>
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
        <SubmitButton text="Submit" className={styles.submit} />
      </div>
    </div>
  </>

export default ProcedurePage;
