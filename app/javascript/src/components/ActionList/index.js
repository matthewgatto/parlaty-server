import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Add from '../SVG/Add';
import ActionInput from '../ActionInput';
import styles from './index.module.css';

function ActionList(props){
  const {values: {steps}} = useFormikContext();
  const actions = steps[props.idx] ? steps[props.idx].actions : false;
  if(!actions || actions.length == 0 ) return null
  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return;
    }
    props.arrayHelpers.move(source.index, destination.index)
  }

  return(
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
            {actions.map((action, i) => (
              <Draggable key={action.id} draggableId={action.id} index={i}>
                {(provided, snapshot) => <ActionInput name={`${props.name}.${i}.value`} idx={i} {...provided.dragHandleProps} {...provided.draggableProps} setRef={provided.innerRef} remove={props.arrayHelpers.remove} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default function(props){
  const name = `steps.${props.idx}.actions`;
  return(
    <FieldArray name={name}>
      {arrayHelpers => (
        <>
          <label>Actions</label>
          <ActionList idx={props.idx} name={name} arrayHelpers={arrayHelpers} />
          <div className={styles.addButton} onClick={()=> {arrayHelpers.push({id: Date.now(), value: ''})}}><Add className={styles.addIcon} /> Add Action</div>
        </>
      )}
    </FieldArray>
  )
}
