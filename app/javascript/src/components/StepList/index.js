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
    props.arrayHelpers.move(source.index, destination.index)
    var stepOrder;
    if(source.index > destination.index){
      stepOrder = [...steps.slice(0, destination.index), steps[source.index], ...steps.slice(destination.index, source.index), ...steps.slice(source.index+1)].map(step => step.id)
    } else {
      stepOrder = [...steps.slice(0, source.index), ...steps.slice(source.index+1, destination.index+1), steps[source.index], ...steps.slice(destination.index + 1)].map(step => step.id)
    }
    props.reorderStep(stepOrder, (steps[source.index].image || steps[destination.index].image) ? true : false, props.procedure_id)
  }
  return(
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
            {steps.map((step, i) => (
              <Draggable key={step.id} draggableId={step.id} index={i}>
                {(provided, snapshot) => <Step idx={i} id={step.id} steps={steps.length} provided={provided} isDragging={snapshot.isDragging} arrayHelpers={props.arrayHelpers} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
