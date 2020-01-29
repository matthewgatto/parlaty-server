import React from 'react';
import { Controller } from 'react-hook-form';
import Header from '../../Form/Nested/Header';
import {Input} from '../../Inputs';
import ParameterFields from '../../Inputs/Parameter';
import { useSelector } from 'react-redux';
import {getActionById} from '../../../redux/selectors/action';
import styles from './index.module.css';

export default ({id, idx, handleDeleteClick, handleDuplicateClick, title, formKey, provided}) => {
  const initialAction = useSelector(getActionById(id));
  const root = `actions[${id}].`;
  return(
    <div className={styles.wrapper} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
      <Header text={title} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} />
      <div className={styles.container}>
        <Input as="input" defaultValue={initialAction && initialAction.name} formKey={formKey} type="text" required label="Name*" root={root} name="name" />
        <ParameterFields initialName={/*REMOVE check for null values*/(initialAction && initialAction.parameter_name) ? initialAction.parameter_name : undefined} initialValue={/*REMOVE check for null values*/(initialAction && initialAction.parameter_value_8_pack) ? initialAction.parameter_value_8_pack : undefined} formKey={formKey} root={root} />
      </div>
    </div>
  )
}
