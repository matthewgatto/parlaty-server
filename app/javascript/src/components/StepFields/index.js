import React from 'react';
import AnimateHeight from 'react-animate-height';
import {Input, Select, FileInput, CheckBox, Radio} from '../Forms/Inputs';
import PositionSelect from '../../containers/PositionSelect';
import ActionList from '../ActionList';
import StepSaveButton from '../../containers/StepSaveButton';
import StepCloseButton from '../../containers/StepCloseButton';
import styles from './index.module.css';

const DURATION_OPTIONS = [{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]
const DEVICE_OPTIONS = [{value: "Crank handle", label: "Crank handle"}, {value: "Part with Lock", label: "Part with Lock"}, {value: "Blowtorch", label: "Blowtorch"}, {value: "Pressure Washer", label: "Pressure Washer"}, {value: "Wrench", label: "Wrench"}]
export default function(props){
  return(
    <AnimateHeight height={props.isOpen ? 'auto' : 0} duration={200}>
    <div className={styles.content}>
      <Input type="text" name={`steps.${props.idx}.title`} label="Title*" />
      <PositionSelect label="Number*" name={`steps.${props.idx}.number`} steps={props.steps} />
      <Select label="Time*" name={`steps.${props.idx}.time`} options={DURATION_OPTIONS} />
      <div className={styles.boxes}>
        <Radio label="Continuous" name={`steps.${props.idx}.mode`} value="continuous" />
        <Radio label="Manual" name={`steps.${props.idx}.mode`} value="manual" />
        <CheckBox label="Option to Skip" name={`steps.${props.idx}.skip`} />
      </div>
      <Input type="text" label="Location*" name={`steps.${props.idx}.location`} />
      <Select label="Device*" name={`steps.${props.idx}.device`} options={DEVICE_OPTIONS} />
      <ActionList idx={props.idx} />
      <Input type="text" name={`steps.${props.idx}.parameter`} label="Parameter*" />
      <div className={styles.files}>
        <FileInput label="Imagery" name={`steps.${props.idx}.image`} placeholder_name="image" />
        <FileInput label="Audio" name={`steps.${props.idx}.audio`} placeholder_name="audio" />
      </div>
      <StepSaveButton move={props.arrayHelpers.move} idx={props.idx} />
      <StepCloseButton remove={props.arrayHelpers.remove} />
      </div>
    </AnimateHeight>
  )
}
