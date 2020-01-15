import React from 'react';
import { Controller } from "react-hook-form";
import Close from '../../SVG/Close';
import Burger from '../../SVG/Burger';
import styles from './index.module.css';

export default ({id, idx, handleDeleteAction, setRef, defaultValue, dragHandleProps, draggableProps}) => {
  const name = `actions[${id}]`
  return(
    <div {...dragHandleProps} {...draggableProps} ref={setRef} className={`${styles.container} align_center`}>
      <Burger className={styles.burgerIcon} width="1.1em" height="1.1em" />
      <Controller defaultValue={defaultValue} type="text" name={name} as="input" />
      <Close onClick={() => {handleDeleteAction(idx)}} className={styles.deleteIcon} />
    </div>
  )
}
