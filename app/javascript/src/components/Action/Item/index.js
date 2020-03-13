import React,{useState} from 'react';
import AnimateHeight from 'react-animate-height';
import { Controller, useFormContext } from "react-hook-form";
import Gear from '../../SVG/Gear';
import SelectComponent,{withSelectContainer} from '@components/Inputs/Select';
import { StepActionModeRadio, Input, ModeRadio } from '@components/Inputs';
import styles from './index.module.css';

const Select = withSelectContainer(SelectComponent)

const TimeSelect = ({root, ...props}) => {
  const {watch} = useFormContext();
  const mode = watch(`${root}mode`);
  return <Controller {...props} disabled={mode == "continuous"} as={Select} />
}



const makeActionItemClassStr = (isSelected, hasParameterValues) => {
  var classStr = `${styles.container} align_center`;
  if(hasParameterValues) classStr += ` ${styles.selectable}`;
  if(isSelected) classStr += ` ${styles.highlight}`;
  return classStr;
}
const TIME_OPTIONS = [{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]

export default ({position, action, root, formKey, defaultAction}) => {
  const [isOpen, setIsOpen] = useState()
  const hasParameterValues = (action && action.parameter_name && action.parameter_value_8_pack) ? true : false
  const handleClick = () => {
    if(hasParameterValues){
      setIsOpen(!isOpen);
    }
  }
  const actionRoot = `${root}actions[${action.id}].`
  const hasActionCopy = (defaultAction && defaultAction.action_copy) ? true : false
  return(<>
    <div onClick={handleClick} className={makeActionItemClassStr(/*isSelected*/isOpen, hasParameterValues)}>
      <div className={styles.number}>{position}</div>
      <div className={styles.text}>{action.name}</div>
      {hasParameterValues && <Gear className={styles.icon} />}
    </div>
    {hasParameterValues &&
      <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
        <div className={styles.inputs}>
          <Input type="text" as="input" root={actionRoot} name="parameter_value_8_pack" label="Parameter Value" defaultValue={(hasActionCopy && defaultAction.action_copy.parameter_value_8_pack) ? defaultAction.action_copy.parameter_value_8_pack : action.parameter_value_8_pack} />
          <div className={`${styles.durationRow} align_center`}>
            <div className={`${styles.boxes} align_center`}>
              <ModeRadio root={actionRoot} name="mode" defaultValue={(hasActionCopy && defaultAction.action_copy.mode) ? defaultAction.action_copy.mode : (action.mode || "continuous")} />
            </div>
            <TimeSelect defaultValue={(hasActionCopy && defaultAction.action_copy.time) ? defaultAction.action_copy.time : (action.time || 8)} root={actionRoot} options={TIME_OPTIONS} name={`${actionRoot}time`} />
          </div>
        </div>
        {/*<div className={styles.fieldContainer}>
          <div className={styles.valueField}>
            <div className={styles.paramName}>{action.parameter_name}</div>
            <Controller as='input' formKey={formKey} className={styles.valueInput} name={`${actionRoot}parameter_value_8_pack`} defaultValue={(hasActionCopy && defaultAction.action_copy.parameter_value_8_pack) ? defaultAction.action_copy.parameter_value_8_pack : action.parameter_value_8_pack} />
          </div>
          <div className={styles.valueField}>
            <div className={styles.paramName}>Duration</div>
            <Controller defaultValue={(hasActionCopy && defaultAction.action_copy.time) ? defaultAction.action_copy.time : action.time} as={Select} options={TIME_OPTIONS} placeholder="Manual" name={`${actionRoot}time`} />
          </div>
        </div>*/}
      </AnimateHeight>
    }
  </>)
}
