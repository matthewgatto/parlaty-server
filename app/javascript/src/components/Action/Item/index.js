import React,{useState} from 'react';
import { Controller } from "react-hook-form";
import Gear from '../../SVG/Gear';
import styles from './index.module.css';

const makeActionItemClassStr = (isSelected, hasParameterValues) => {
  var classStr = `${styles.container} align_center`;
  if(hasParameterValues) classStr += ` ${styles.selectable}`;
  if(isSelected) classStr += ` ${styles.highlight}`;
  return classStr;
}

export default ({position, action, root, defaultAction}) => {
  const [isOpen, setIsOpen] = useState()
  const hasParameterValues = (action && action.parameter_name && action.parameter_value_8_pack) ? true : false
  const handleClick = () => {
    if(hasParameterValues){
      setIsOpen(!isOpen);
    }
  }
  return(<>
    <div onClick={handleClick} className={makeActionItemClassStr(/*isSelected*/isOpen, hasParameterValues)}>
      <div className={styles.number}>{position}</div>
      <div className={styles.text}>{action.name}</div>
      {hasParameterValues && <Gear className={styles.icon} />}
    </div>
    {hasParameterValues &&
      <div className={isOpen ? styles.valueField : `${styles.valueField} ${styles.hidden}`}>
      <div className={styles.paramName}>{action.parameter_name}</div>
      <Controller as='input' className={styles.valueInput} name={`${root}actions[${action.id}]`} defaultValue={(defaultAction && defaultAction.parameter_value_8_pack) ? defaultAction.parameter_value_8_pack : action.parameter_value_8_pack} />

      </div>
    }
  </>)
}
