import React from 'react';
import { Controller } from 'react-hook-form';
import Close from '../../SVG/Close';
import Burger from '../../SVG/Burger';
import { useSelector } from 'react-redux';
import {getActionById} from '../../../redux/selectors/action';
import styles from './index.module.css';

export default ({id, idx, handleDeleteAction, setRef, dragHandleProps, draggableProps}) => {
  const initialAction = useSelector(getActionById(id));
  const root = `actions[${id}].`;
  return(
    <div {...dragHandleProps} {...draggableProps} ref={setRef} className={`${styles.container} align_center`}>
      <Burger className={styles.burgerIcon} width="1.1em" height="1.1em" />
      <Controller defaultValue={initialAction && initialAction.name} name={`${root}name`} as="input" className={styles.input} />
      <Close onClick={() => {handleDeleteAction(idx)}} className={styles.deleteIcon} />
    </div>
  )
}
