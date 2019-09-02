import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProcedureStep from '../../containers/ProcedureStep';
import Placeholder from '../Placeholder';
import styles from './index.module.css';

const ProcedureSteps = ({steps, onDragEnd}) => steps && steps.length ? (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
          {steps.map((step, i) => (
            <Draggable key={step.id} draggableId={step.id} index={i}>
              {(provided, snapshot) => <ProcedureStep idx={i} step={step} provided={provided} isDragging={snapshot.isDragging} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>

) : <Placeholder text="This procedure currently has no steps" />

export default ProcedureSteps;
