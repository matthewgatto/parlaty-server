import React from 'react';
import Gear from '../../SVG/Gear';
import styles from './index.module.css';

const makeActionItemClassStr = (isSelected, hasParameterValues) => {
  var classStr = `${styles.container} align_center`;
  if(hasParameterValues) classStr += ` ${styles.selectable}`;
  if(isSelected) classStr += ` ${styles.highlight}`;
  return classStr;
}

export default ({position, action, selectedAction, setSelectedAction}) => {
  const isSelected = selectedAction && selectedAction.id === action.id
  const hasParameterValues = (action && action.parameter_name && action.parameter_value_8_pack) ? true : false
  const handleClick = () => {
    if(!isSelected && hasParameterValues){
      setSelectedAction(action)
    }
  }
  return(
    <div onClick={handleClick} className={makeActionItemClassStr(isSelected, hasParameterValues)}>
      <div className={styles.number}>{position}</div>
      <div className={styles.text}>{action.name}</div>
      {hasParameterValues && <Gear className={styles.icon} />}
    </div>
  )
}
