import React from 'react';
import {useDispatch} from 'react-redux';
import uuid from 'uuid/v4';
import FormContext from '@components/Form/Context';
import Polygon from '@components/SVG/PolygonH';
import StepList from '@containers/StepList'
import AddStepFormButton from '@containers/AddStepFormButton'
import SubmitButton from '@components/SubmitButton'
import {addToast} from '@actions/toast';
import { procedureSchema } from '@utils/validation';
import styles from './index.module.css';

export default ({match:{url,params:{oem_id,business_id,id}},history:{push},location:{pathname}}) => {
  const dispatch = useDispatch()
  const submitPath = pathname.split("/").slice(0,-2).reduce((a,b) => `${a}/${b}`);
  const handleSubmitClick = () => {
    push(submitPath)
    dispatch(addToast("success", "Procedure was successfully added."))
  }
  return(
    <div className={styles.container}>
      <div className={styles.topPolygonContainer}>
        <Polygon className={styles.topPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.topPolygonTwo} fill="none" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.topPolygonThree} fill="none" stroke="#67318d" size="2.6em" />
        <Polygon className={styles.topPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>Add Procedure Steps</div>
        <div className={styles.subheader}>Now add steps to your procedure or continue and add them at a later time</div>
      </div>
      <FormContext
        entity="step_list"
        url="url_placeholder"
        type="TYPE_PLACEHOLDER"
        initialValues={{}}
        validationSchema={procedureSchema}
        className={styles.form}
        id={uuid()}
      >
        {({handleSubmit, formKey}) => (<>
          <StepList procedure_id={id} formKey={formKey} />
          <AddStepFormButton formKey={formKey} />
          <SubmitButton onClick={handleSubmitClick} label="Submit Procedure" className={styles.submit} />
        </>)}
      </FormContext>
      <div className={styles.bottomPolygonContainer}>
        <Polygon className={styles.bottomPolygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.7em" />
        <Polygon className={styles.bottomPolygonTwo} fill="#67318d" stroke="#67318d" size="1.4em" />
        <Polygon className={styles.bottomPolygonThree} fill="none" stroke="#67318d" size="1.5em" />
        <Polygon className={styles.bottomPolygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.4em" />
      </div>
    </div>
  )
}
