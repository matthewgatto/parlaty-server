import React,{useState,useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import AnimateHeight from 'react-animate-height';
import Gear from '../../SVG/Gear';
import ModeAndTimeFields from '@components/Inputs/ModeAndTimeFields';
import { Input } from '@components/Inputs';
import styles from './index.module.css';

const makeActionItemClassStr = (isSelected, hasParameterValues) => {
  let classStr = `${styles.header} align_center`;
  if(hasParameterValues) classStr += ` ${styles.selectable}`;
  if(isSelected) classStr += ` ${styles.highlight}`;
  return classStr;
}

export default ({position, action, parent, actionValues, root, onChange}) => {
  const [isOpen, setIsOpen] = useState();
  const {setValue} = useFormContext();
  const hasParameterValues = !!(action && action.parameter_name && action.parameter_value_8_pack)
  const handleClick = () => {
    if(hasParameterValues){
      setIsOpen(!isOpen);
    }
  }

  let actionParameterName = actionValues && actionValues.parameter_name || action.parameter_name;
  let actionParameterValue = actionValues && actionValues.parameter_value_8_pack || action.parameter_value_8_pack;
  let actionTime = actionValues && actionValues.time || action.time;
  let actionMode = actionValues && actionValues.mode || action.mode;
  let paramNameTitle = `Parameter Name (default ${ (!parent) ? actionParameterName : parent.parameter_name})`
  let paramValueTitle = `Parameter Value (default ${ (!parent) ? actionParameterValue : parent.parameter_value_8_pack})`
  let actionName = `${action.name}${(hasParameterValues) ? ` (${actionParameterName} ${actionParameterValue})` : ""} `
  const actionRoot = `${root}actions[${action.id}].`
  useEffect(() => {
    setValue(`${actionRoot}parameter_name`, actionParameterName);
    setValue(`${actionRoot}parameter_value_8_pack`, actionParameterValue);
    setValue(`${actionRoot}time`, actionTime);
    setValue(`${actionRoot}mode`, actionMode);
  }, [action,actionRoot,setValue])

  return(
    <div className={styles.container}>
      <div onClick={handleClick} className={makeActionItemClassStr(isOpen, hasParameterValues)}>
        <div className={styles.number}>{position}</div>
        <div className={styles.text}>{actionName}</div>
        {hasParameterValues && <Gear className={styles.icon} />}
      </div>
      {hasParameterValues &&
        <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
          <div className={styles.inputs}>
            <Input onChange={([e]) => onChange(e)} type="text" as="input" root={actionRoot} name="parameter_name" label={paramNameTitle} defaultValue={actionParameterName} />
            <Input onChange={([e]) => onChange(e)} type="text" as="input" root={actionRoot} name="parameter_value_8_pack" label={paramValueTitle} defaultValue={actionParameterValue} />
            <ModeAndTimeFields onChange={onChange} defaultTime={actionTime || 8} defaultMode={actionMode || "continuous"} root={actionRoot} />
          </div>
        </AnimateHeight>
      }
    </div>
  )
}
