import React,{useState,useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import AnimateHeight from 'react-animate-height';
import Gear from '../../SVG/Gear';
import ModeAndTimeFields from '@components/Inputs/ModeAndTimeFields';
import { Input } from '@components/Inputs';
import styles from './index.module.css';

const makeActionItemClassStr = (isSelected, hasParameterValues) => {
  var classStr = `${styles.header} align_center`;
  if(hasParameterValues) classStr += ` ${styles.selectable}`;
  if(isSelected) classStr += ` ${styles.highlight}`;
  return classStr;
}

export default ({position, action, parent, root, formKey, onChange}) => {
  const [isOpen, setIsOpen] = useState();
  const {setValue} = useFormContext();
  const hasParameterValues = !!(action && action.parameter_name && action.parameter_value_8_pack)
  const handleClick = () => {
    if(hasParameterValues){
      setIsOpen(!isOpen);
    }
  }
  let paramValueTitle = `Parameter Value (default ${ (!parent) ? action.parameter_value_8_pack : parent.parameter_value_8_pack})`
  const actionRoot = `${root}actions[${action.id}].`
  useEffect(() => {
    setValue(`${actionRoot}parameter_value_8_pack`, action.parameter_value_8_pack);
    setValue(`${actionRoot}time`, action.time);
    setValue(`${actionRoot}mode`, action.mode);
  }, [action,actionRoot,setValue])

  return(
    <div className={styles.container}>
      <div onClick={handleClick} className={makeActionItemClassStr(/*isSelected*/isOpen, hasParameterValues)}>
        <div className={styles.number}>{position}</div>
        <div className={styles.text}>{action.name}</div>
        {hasParameterValues && <Gear className={styles.icon} />}
      </div>
      {hasParameterValues &&
        <AnimateHeight height={isOpen ? 'auto' : 0} duration={200} >
          <div className={styles.inputs}>
            <Input onChange={([e]) => onChange(e)} type="text" as="input" root={actionRoot} name="parameter_value_8_pack" label={paramValueTitle} defaultValue={action.parameter_value_8_pack} />
            <ModeAndTimeFields onChange={onChange} defaultTime={action.time || 8} defaultMode={action.mode || "continuous"} root={actionRoot} />
          </div>
        </AnimateHeight>
      }
    </div>
  )
}
