import React from 'react';
import AnimateHeight from 'react-animate-height';
import StepHeader from '@containers/StepHeader';
import DeviceSelect from '@containers/DeviceSelect';
import FormError from '@containers/FormError';
import StepSaveButton from '@containers/StepSaveButton';
import StepCancelButton from '@components/Step/CancelButton';
import { Input, CheckBox, Select, ImageInput, AudioInput, ModeRadio } from '@components/Inputs';
import styles from './index.module.css';

export default ({isDuplicate, root, idx, title, isOpen, procedure_id, formKey, id, positions, initialValues, devices, timeOptions, procedureFormKey, handleCloseForm}) => (
  <>
    <StepHeader isDuplicate={isDuplicate} isOpen={isOpen ? true : false} title={title} procedure_id={procedure_id} idx={idx} id={id} root={root} handleCloseForm={handleCloseForm} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className={styles.container}>
        <Input as="input" defaultValue={initialValues.title} formKey={formKey} type="text" required label="Title*" root={root} name="title" />
        <CheckBox labelClass={`${styles.spoken} align_center`} label="Spoken" root={root} name="spoken" defaultValue={initialValues.spoken || false} />
        <Input as="textarea" label="Note" root={root} name="note" defaultValue={initialValues.note} required rows="4" formKey={formKey} />
        <Select defaultValue={initialValues.number || 1} formKey={formKey} label="Number*" root={root} name="number" options={positions} />
        <Select defaultValue={initialValues.time || 8} formKey={formKey} options={timeOptions} label="Time*" root={root} name="time" />
        <div className={`${styles.boxes} align_center`}>
          <ModeRadio formKey={formKey} root={root} name="mode" defaultValue={initialValues.mode || "continuous"} />
          <CheckBox formKey={formKey} label="Option to Skip" root={root} name="safety" defaultValue={initialValues.safety || false} />
        </div>
        <Input as="input" defaultValue={initialValues.location} formKey={formKey} type="text" label="Subtitle" root={root} name="location"  />
        <DeviceSelect options={devices} label="Device" root={root} name="device_id" defaultValue={initialValues.device_id && !isNaN(initialValues.device_id) && initialValues.device_id} />
        <div>
          <ImageInput formKey={formKey} defaultValue={initialValues.visual} label="Image*" root={root} name="visual" />
        </div>
        <div>
          <AudioInput formKey={formKey} defaultValue={initialValues.audio} label="Audio*" root={root} name="audio" />
        </div>
        <div className={styles.error}>
          <FormError formKey={formKey} large />
        </div>
        <StepSaveButton root={root} formKey={formKey} id={id} procedure_id={procedure_id} procedureFormKey={procedureFormKey} />
        <StepCancelButton onClick={handleCloseForm} />
      </div>
    </AnimateHeight>
  </>
)
