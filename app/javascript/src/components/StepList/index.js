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
    if (!destination || destination.index === source.index) {
      return;
    }
    props.arrayHelpers.move(source.index, destination.index);
    props.reorderStep(source.index, destination.index, props.procedure_id)
  }
  const handleBeforeCapture = () => {
    props.setStep(null)
  }
  return(
    <DragDropContext onDragEnd={handleDragEnd} onBeforeCapture={handleBeforeCapture}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
            {steps.map((step, i) => (
              <Draggable key={step.id} draggableId={step.id} index={i}>
                {(provided, snapshot) => <Step idx={i} id={step.id} steps={steps.length} provided={provided} isDragging={snapshot.isDragging} isEditing={props.procedure_id ? true : false} arrayHelpers={props.arrayHelpers} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
