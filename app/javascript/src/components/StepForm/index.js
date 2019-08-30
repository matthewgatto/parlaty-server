import React from 'react';
import ActionWell from '../ActionWell';
import InputField from '../InputField';
import StepSaveButton from '../../containers/StepSaveButton';
import PositionSelect from '../../containers/PositionSelect';
import DurationSelect from '../../containers/DurationSelect';
import FileInput from '../../containers/FileInput';
import Radio from '../../containers/Radio';
import CheckBox from '../../containers/CheckBox';
import styles from './index.module.css';

const StepForm = ({isOpen}) => isOpen ? (
  <div className={styles.container}>
    <ActionWell text="New Step" rightIcon={<span>&#9660;</span>} />
    <div className={styles.form}>
    <InputField label="Step Title*" form="step" name="title" />
    <PositionSelect />
    <DurationSelect />
    <div className={styles.row}>
      <Radio label="Continuous" name="playback" form="step" value="continuous" />
      <Radio label="Manual" name="playback" form="step" value="manual" />
      <CheckBox label="Option to Skip" name="skip" form="step" />
    </div>
    <InputField label="Location*" form="step" name="location" />
    <InputField label="Parameter*" form="step" name="parameter" />
    <div className={styles.row}>
      <FileInput label="Imagery" form="step" name="image" />
      <FileInput label="Audio" form="step" name="audio" />
    </div>
    <StepSaveButton text="Save" className={styles.save} />
    </div>
  </div>
) : null


export default StepForm;
