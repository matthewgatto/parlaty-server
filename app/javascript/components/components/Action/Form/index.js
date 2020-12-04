import React from 'react';
import Header from '@components/Form/Nested/Header';
import {Input, ArrFileInput} from '@components/Inputs';
import ModeAndTimeFields from '@components/Inputs/ModeAndTimeFields';
import styles from './index.module.css';

export default ({id, idx, root, isDragging, initialAction, handleDeleteClick, handleDuplicateClick, title, looped, formKey, provided, color}) => (
  <div className={styles.wrapper} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
    <Header id={id} text={title} looped={looped} handleDeleteClick={handleDeleteClick} handleDuplicateClick={handleDuplicateClick} color={color} />
    <div className={styles.container}>
      <div className={styles.actionInputs}>
        <div className={styles.firstInput}>
          <Input as="input" defaultValue={initialAction && initialAction.name} formKey={formKey} type="text" required label="Action Name*" root={root} name="name" />
        </div>
        <div className={styles.secondInput}>
          <Input as="input" defaultValue={initialAction && initialAction.parameter_value_8_pack || ''} formKey={formKey} type="text" label="Action Value" root={root} name="parameter_value_8_pack" />
        </div>
      </div>
      <ModeAndTimeFields defaultTime={(initialAction && initialAction.time) ? initialAction.time : 8} defaultMode={(initialAction && initialAction.mode) ? initialAction.mode : "continuous"} root={root} />
      <div>
        <ArrFileInput name="media" label="Media" formKey={formKey} idx={idx} defaultValues={initialAction && initialAction.visuals || undefined} root={root} objName={'action'}
                      radio={{isShown: false, params: [], actionRoot: 'default_media', defaultValue: (initialAction && initialAction.default_media), withoutChecked: true}}
        />
      </div>
    </div>
  </div>
)
