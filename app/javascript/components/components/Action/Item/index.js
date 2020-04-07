import React,{useState} from 'react';
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

export default ({position, action, root, formKey, defaultAction}) => {
  const [isOpen, setIsOpen] = useState()
  const hasParameterValues = (action && action.parameter_name && action.parameter_value_8_pack) ? true : false
  const handleClick = () => {
    if(hasParameterValues){
      setIsOpen(!isOpen);
    }
  }
  const actionRoot = `${root}actions[${action.id}].`
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
            <Input type="text" as="input" root={actionRoot} name="parameter_value_8_pack" label="Parameter Value" defaultValue={action.parameter_value_8_pack} />
            <ModeAndTimeFields defaultTime={action.time || 8} defaultMode={action.mode || "continuous"} root={actionRoot} />
          </div>
        </AnimateHeight>
      }
    </div>
  )
}
