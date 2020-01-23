import React from 'react';
import AnimateHeight from 'react-animate-height';
import StepHeader from '../../../containers/StepHeader';
import DeviceSelect from '../../../containers/DeviceSelect';
import FormError from '../../../containers/FormError';
import StepSaveButton from '../../../containers/StepSaveButton';
import StepCloseButton from '../../../containers/StepCloseButton';
import { Input, CheckBox, Select, FileInput, ModeRadio, Textarea } from '../../Inputs';
import ParameterFields from '../../Inputs/Parameter';
import styles from './index.module.css';

export default ({isDuplicate, root, idx, title, isOpen, procedure_id, formKey, id, positions, initialValues, devices, timeOptions, procedureFormKey}) => (
  <>
    <StepHeader isDuplicate={isDuplicate} isOpen={isOpen ? true : false} title={title} procedure_id={procedure_id} idx={idx} id={id} root={root} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className={styles.container}>
        <Input defaultValue={initialValues.title} formKey={formKey} type="text" required label="Title*" root={root} name="title" />
        <CheckBox labelClass={`${styles.spoken} align_center`} label="Spoken" root={root} name="spoken" defaultValue={initialValues.spoken || false} />
        <Textarea label="Note*" root={root} name="note" defaultValue={initialValues.note} required rows="4" formKey={formKey} />
        <Select defaultValue={idx+1} formKey={formKey} label="Number*" root={root} name="number" options={positions} />
        <Select options={timeOptions} label="Time*" root={root} name="time" defaultValue={initialValues.time} />
        <div className={`${styles.boxes} align_center`}>
          <ModeRadio root={root} name="mode" defaultValue={initialValues.mode} />
          <CheckBox label="Option to Skip" root={root} name="safety" defaultValue={initialValues.safety || false} />
        </div>
        <Input defaultValue={initialValues.location} formKey={formKey} type="text" required label="Location*" root={root} name="location"  />
        <DeviceSelect options={devices} label="Device*" root={root} name="device" defaultValue={/*REMOVE*/(initialValues.device && !isNaN(initialValues.device)) ? initialValues.device : 1} />
        <ParameterFields initialName={/*REMOVE check for null values*/initialValues.parameter_name ? initialValues.parameter_name : undefined} initialValue={/*REMOVE check for null values*/initialValues.parameter_value_8_pack ? initialValues.parameter_value_8_pack : undefined} formKey={formKey} root={root} />
        <div className={styles.files}>
          <FileInput defaultValue={initialValues.visual} label="Image*" root={root} name="visual" />
          <FileInput defaultValue={initialValues.audio} label="Audio*" root={root} name="audio" />
        </div>
        <div className={styles.error}>
          <FormError formKey={formKey} large />
        </div>
        <StepSaveButton root={root} formKey={formKey} id={id} procedure_id={procedure_id} procedureFormKey={procedureFormKey} />
        <StepCloseButton root={root} idx={idx} initialValues={isOpen.initialValues} isDuplicate={isDuplicate} />
      </div>
    </AnimateHeight>
  </>
)
