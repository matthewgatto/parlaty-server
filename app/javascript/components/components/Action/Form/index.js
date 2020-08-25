import React from 'react';
import Header from '@components/Form/Nested/Header';
import {Input, Select, ArrFileInput} from '@components/Inputs';
import ParameterFields from '@components/Inputs/Parameter';
import ModeAndTimeFields from '@components/Inputs/ModeAndTimeFields';
import styles from './index.module.css';

const TIME_OPTIONS = [{value: 0, label: "0 seconds"},{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]

export default ({id, idx, root, isDragging, initialAction, handleDeleteClick, handleDuplicateClick, title, formKey, provided, color}) => (
  <div className={styles.wrapper} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
    <Header text={title} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} color={color} />
    <div className={styles.container}>
      <Input as="input" defaultValue={initialAction && initialAction.name} formKey={formKey} type="text" required label="Default Name*" root={root} name="name" />
      <ParameterFields initialName={/*REMOVE check for null values*/(initialAction && initialAction.parameter_name) ? initialAction.parameter_name : undefined} initialValue={/*REMOVE check for null values*/(initialAction && initialAction.parameter_value_8_pack) ? initialAction.parameter_value_8_pack : undefined} formKey={formKey} root={root} />
      <ModeAndTimeFields defaultTime={(initialAction && initialAction.time) ? initialAction.time : 8} defaultMode={(initialAction && initialAction.mode) ? initialAction.mode : "continuous"} root={root} />
      <div>
        <ArrFileInput name="media" label="Media*" formKey={formKey} idx={idx} defaultValues={initialAction && initialAction.visuals || undefined} root={root} objName={'action'}
                      radio={{isShown: false, params: [], actionRoot: 'defaultMedia', defaultValue: (initialAction && initialAction.defaultMedia), withoutChecked: true}}
        />
      </div>
    </div>
  </div>
)
