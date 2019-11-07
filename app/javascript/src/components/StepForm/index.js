import React from 'react';
import InputField from '../InputField';
import StepSaveButton from '../../containers/StepSaveButton';
import PositionSelect from '../../containers/PositionSelect';
import DurationSelect from '../../containers/DurationSelect';
import FileInput from '../../containers/FileInput';
import Radio from '../../containers/Radio';
import CheckBox from '../../containers/CheckBox';
import FormCloseButton from '../../containers/FormCloseButton';
import Actions from '../../containers/Actions';
import DeviceSelect from '../../containers/DeviceSelect';
import styles from './index.module.css';

const StepForm = () =>
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
    <DeviceSelect />
    <Actions />
    <InputField label="Parameter*" form="step" name="parameter" />
    <div className={styles.row}>
      <FileInput label="Imagery" form="step" name="image" />
      <FileInput label="Audio" form="step" name="audio" />
    </div>
    <StepSaveButton text="Save" className={styles.save} />
    <FormCloseButton />
  </div>

export default StepForm;
