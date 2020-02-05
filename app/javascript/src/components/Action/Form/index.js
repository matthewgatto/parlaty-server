import React from 'react';
import { useSelector } from 'react-redux';
import Header from '@components/Form/Nested/Header';
import {Input} from '@components/Inputs';
import ParameterFields from '@components/Inputs/Parameter';
import {getActionById} from '@selectors/action';
import styles from './index.module.css';

export default ({id, idx, isDragging, handleDeleteClick, handleDuplicateClick, title, formKey, provided, color}) => {
  const initialAction = useSelector(getActionById(id));
  const root = `actions[${id}].`;
  return(
    <div className={styles.wrapper} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
      <Header text={title} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} color={color} />
      <div className={styles.container}>
        <Input as="input" defaultValue={initialAction && initialAction.name} formKey={formKey} type="text" required label="Name*" root={root} name="name" />
        <ParameterFields initialName={/*REMOVE check for null values*/(initialAction && initialAction.parameter_name) ? initialAction.parameter_name : undefined} initialValue={/*REMOVE check for null values*/(initialAction && initialAction.parameter_value_8_pack) ? initialAction.parameter_value_8_pack : undefined} formKey={formKey} root={root} />
      </div>
    </div>
  )
}
