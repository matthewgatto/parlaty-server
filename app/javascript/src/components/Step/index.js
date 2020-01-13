import React from 'react';
import AnimateHeight from 'react-animate-height';
import StepHeader from '../../containers/StepHeader';
import DeviceSelect from '../../containers/DeviceSelect';
import FormError from '../../containers/FormError';
import StepSaveButton from '../../containers/StepSaveButton';
import StepCloseButton from '../../containers/StepCloseButton';
import { Input, CheckBox, Select, FileInput, ModeRadio } from '../Inputs';

export default ({isDuplicate, root, idx, title, isOpen, procedure_id, formKey, id, positions, initialValues, devices, timeOptions, procedureFormKey}) => (
  <>
    <StepHeader isDuplicate={isDuplicate} isOpen={isOpen ? true : false} title={title} procedure_id={procedure_id} idx={idx} id={id} root={root} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className="step_form">
        <Input defaultValue={initialValues.title} formKey={formKey} type="text" required label="Title*" root={root} name="title" />
        <CheckBox labelClass="spoken_box" label="Spoken" root={root} name="spoken" defaultValue={initialValues.spoken || false} />
        <Select defaultValue={idx+1} formKey={formKey} label="Number*" root={root} name="number" options={positions} />
        <Select options={timeOptions} label="Time*" root={root} name="time" defaultValue={initialValues.time} />
        <div className="step_form__boxes">
          <ModeRadio root={root} name="mode" defaultValue={initialValues.mode} />
          <CheckBox label="Option to Skip" root={root} name="skip" defaultValue={initialValues.skip || false} />
        </div>
        <Input defaultValue={initialValues.location} formKey={formKey} type="text" required label="Location*" root={root} name="location"  />
        <DeviceSelect options={devices} label="Device*" root={root} name="device" defaultValue={initialValues.device} />
        <Input defaultValue={/*REMOVE check for null values*/initialValues.parameter ? initialValues.parameter : undefined} formKey={formKey} type="text" required label="Parameter*" root={root} name="parameter" />
        <div className="step_form__files">
          <FileInput defaultValue={initialValues.image} label="Image*" root={root} name="image" />
          <FileInput defaultValue={initialValues.audio} label="Audio*" root={root} name="audio" />
        </div>
        <div className="step_error_container">
          <FormError formKey={formKey} large />
        </div>
        <StepSaveButton root={root} formKey={formKey} id={id} procedure_id={procedure_id} procedureFormKey={procedureFormKey} />
        <StepCloseButton root={root} idx={idx} initialValues={isOpen.initialValues} isDuplicate={isDuplicate} />
      </div>
    </AnimateHeight>
  </>
)
