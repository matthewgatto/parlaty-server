import React, {useCallback} from 'react';
import { useFormContext } from "react-hook-form";
import AnimateHeight from 'react-animate-height';
import StepHeader from '@containers/StepHeader';
import FormError from '@containers/FormError';
import SpokenBox from '@components/Inputs/SpokenBox';
import StepSaveButton from '@containers/StepSaveButton';
import StepCancelButton from '@components/Step/CancelButton';
import { Input, Select } from '@components/Inputs';
import styles from './index.module.css';
import { setStepValues } from '@actions/template'
import TimeMode from '@components/Step/TimeMode';
import Tabs from '@components/Step/Tabs';
import {useDispatch} from "react-redux";

const TIME_OPTIONS = [{value: 0, label: "0 seconds"}, {value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}];

const TimeSelect = (props) => {
  const {watch} = useFormContext();
  const mode = watch(`${props.root}mode`);
  return <Select {...props} disabled={mode === "manual" || mode === "continuous"} options={TIME_OPTIONS} label="Time" name="time" />
};

export default ({isDuplicate, root, idx, title, looped, isOpen, procedure_id, oemBusinessId, formKey, id, initialValues, procedureFormKey, handleCloseForm}) => {
  const dispatch = useDispatch();
  const updateStepParams = useCallback(([e]) => {
      let name = e.target.name.split(root).pop();
      dispatch(setStepValues(idx, {[name]: (e.target.type === "checkbox" ? e.target.checked : e.target.value)}));
  }, [dispatch, root]);
  return (
    <div className={styles.wrapper}>
      <StepHeader isDuplicate={isDuplicate} isOpen={isOpen} title={title} looped={looped} procedure_id={procedure_id} idx={idx} id={id} root={root} handleCloseForm={handleCloseForm} />
      <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
        <div className={styles.container}>
          <div className={styles.titleWrapper}>
            <SpokenBox onChange={updateStepParams} idx={idx} labelClass={`${styles.spoken} align_center`} root={root} defaultValue={initialValues.spoken || false} />
            <Input onChange={updateStepParams} as="input" defaultValue={initialValues.title} formKey={formKey} type="text" required label="Title*" root={root} name="title" />
          </div>
          <div className={`${styles.boxes} align_center`}>
            <TimeMode onChange={updateStepParams} formKey={formKey} root={root} defaultValue={initialValues}/>
           </div>
          <TimeSelect onChange={updateStepParams} formKey={formKey} root={root} defaultValue={initialValues.time || 0} />
          <Tabs updateParams={updateStepParams} oemBusinessId={oemBusinessId} initialValues={initialValues} formKey={formKey} root={root} procedure_id={procedure_id} idx={idx} />
          <div className={styles.error}>
            <FormError formKey={formKey} large />
          </div>
          <StepSaveButton root={root} formKey={formKey} id={id} procedure_id={procedure_id} procedureFormKey={procedureFormKey} idx={idx} />
          <StepCancelButton onClick={handleCloseForm} />
        </div>
      </AnimateHeight>
    </div>
  )
}
