import React from 'react';
import { useSelector } from 'react-redux';
import Header from '@components/Form/Nested/Header';
import {Input,Select} from '@components/Inputs';
import ParameterFields from '@components/Inputs/Parameter';
import {getActionById} from '@selectors/action';
import styles from './index.module.css';

const TIME_OPTIONS = [{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]

export default ({id, idx, isDragging, handleDeleteClick, handleDuplicateClick, title, formKey, provided, color}) => {
  const initialAction = useSelector(getActionById(id));
  const root = `actions[${id}].`;
  return(
    <div className={styles.wrapper} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
      <Header text={title} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} color={color} />
      <div className={styles.container}>
        <Input as="input" defaultValue={initialAction && initialAction.name} formKey={formKey} type="text" required label="Name*" root={root} name="name" />
        <ParameterFields initialName={/*REMOVE check for null values*/(initialAction && initialAction.parameter_name) ? initialAction.parameter_name : undefined} initialValue={/*REMOVE check for null values*/(initialAction && initialAction.parameter_value_8_pack) ? initialAction.parameter_value_8_pack : undefined} formKey={formKey} root={root} />
        <Select defaultValue={initialAction && initialAction.time} formKey={formKey} options={TIME_OPTIONS} label="Duration" root={root} name="time" placeholder="Manual" />
      </div>
    </div>
  )
}
