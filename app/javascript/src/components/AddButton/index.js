import React from 'react';
import ActionWell from '../ActionWell';
import Triangle from '../Triangle';
import styles from './index.module.css';

const AddButton = ({text, className, ...rest}) =>
  <ActionWell
    text={text}
    leftIcon={
      <svg className={styles.icon} width="1.4em" height="1.4em" viewBox="0 0 150 150">
      	<line fill="none" stroke="#67318d" strokeWidth="46" x1="75" y1="0" x2="75" y2="150"/>
      	<line fill="none" stroke="#67318d" strokeWidth="46" x1="0" y1="75" x2="150" y2="75"/>
      </svg>
    }
    rightIcon={<Triangle />}
    {...rest}
  />

export default AddButton;
