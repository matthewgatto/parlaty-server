import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import SelectComponent,{withSelectContainer} from '@components/Inputs/Select';
import { ModeRadio } from '@components/Inputs';
import styles from './index.module.css';

const Select = withSelectContainer(SelectComponent);

const TimeSelect = ({root, ...props}) => {
  const {watch} = useFormContext();
  const mode = watch(`${root}mode`);
  return <Controller {...props} disabled={mode === "manual" || mode === "continuous"} as={Select} />
};

const TIME_OPTIONS = [{value: 0, label: "0 seconds"},{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}];

export default ({root, defaultTime, defaultMode, onChange}) => (
  <div className={styles.container}>
    <div className={`${styles.boxes} align_center`}>
      <ModeRadio onChange={([e]) => onChange && onChange(e) || null} root={root} name="mode" defaultValue={defaultMode} />
    </div>
    <TimeSelect onChange={([e]) => onChange && onChange(e) || null} defaultValue={defaultTime} root={root} options={TIME_OPTIONS} name={`${root}time`} />
  </div>
)
