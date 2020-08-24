import React from 'react';
import { useFormContext } from "react-hook-form";
import AnimateHeight from 'react-animate-height';
import StepHeader from '@containers/StepHeader';
import DeviceSelect from '@containers/DeviceSelect';
import FormError from '@containers/FormError';
import SpokenBox from '@components/Inputs/SpokenBox';
import StepSaveButton from '@containers/StepSaveButton';
import StepCancelButton from '@components/Step/CancelButton';
import { Input, CheckBox, Select, ModeRadio, ArrFileInput, LimitedTextArea } from '@components/Inputs';
import styles from './index.module.css';


const TIME_OPTIONS = [{value: 0, label: "0 seconds"}, {value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]

const TimeSelect = (props) => {
  const {watch} = useFormContext();
  const mode = watch(`${props.root}mode`);
  return <Select {...props} disabled={mode == "manual" || mode === "continuous"} options={TIME_OPTIONS} label="Time" name="time" />
}

export default ({isDuplicate, root, idx, title, isOpen, procedure_id, formKey, id, initialValues, procedureFormKey, handleCloseForm, isDragging, provided}) => (
  <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className={styles.wrapper}>
    <StepHeader isDuplicate={isDuplicate} isOpen={isOpen ? true : false} title={title} procedure_id={procedure_id} idx={idx} id={id} root={root} handleCloseForm={handleCloseForm} />
    <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <SpokenBox idx={idx} labelClass={`${styles.spoken} align_center`} root={root} defaultValue={initialValues.spoken || false} />
          <Input as="input" defaultValue={initialValues.title} formKey={formKey} type="text" required label="Title*" root={root} name="title" />
        </div>
        <div className={`${styles.boxes} align_center`}>
          <ModeRadio formKey={formKey} root={root} name="mode" defaultValue={initialValues.mode || "continuous"} />
          <CheckBox formKey={formKey} label="Option to Skip" root={root} name="safety" defaultValue={initialValues.safety || false} />
        </div>
        <TimeSelect formKey={formKey} root={root} defaultValue={initialValues.time || 0} />
        <Input as="input" defaultValue={initialValues.loop_value || 1} formKey={formKey} type="text" label="Number of Loops" root={root} name="loop_value" />
        <LimitedTextArea as="textarea" defaultValue={initialValues.location || ''} label="Instruction" name="location" rows="6" root={root} formKey={formKey} limit={300}/>
        <DeviceSelect procedure_id={procedure_id} label="Device" root={root} name="device_id" defaultValue={initialValues.device} />
        <div>
          <ArrFileInput name="media" label="Media*" formKey={formKey} idx={idx} defaultValues={initialValues.visuals || undefined} root={root} item={'step'}
            radio={{isShown: true, params: [{type: 'image', label: 'Display image for step in app'},{type: 'video', label: 'Display video for step in app'}], actionRoot: 'defaultMedia', defaultValue: initialValues.defaultMedia, withoutCheck: true}}
          />
        </div>
        <div className={styles.error}>
          <FormError formKey={formKey} large />
        </div>
        <StepSaveButton root={root} formKey={formKey} id={id} procedure_id={procedure_id} procedureFormKey={procedureFormKey} idx={idx} />
        <StepCancelButton onClick={handleCloseForm} />
      </div>
    </AnimateHeight>
  </div>
)
