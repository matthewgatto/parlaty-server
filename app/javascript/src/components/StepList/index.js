import React from 'react';
import { useFormikContext} from 'formik';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Placeholder from '../Placeholder';
import Step from '../../containers/Step';
import styles from './index.module.css';

export default function(props){
  const {values: {steps}} = useFormikContext();
  if(!steps || steps.length == 0 ) return <Placeholder text="This procedure currently has no steps" />
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
            {steps.map((step, i) => (
              <Draggable key={step.id} draggableId={step.id} index={i}>
                {(provided, snapshot) => <Step idx={i} steps={steps.length} provided={provided} isDragging={snapshot.isDragging} arrayHelpers={props.arrayHelpers} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
