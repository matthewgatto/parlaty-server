import React from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default (WrappedComponent) => ({onDragEnd, onBeforeCapture, className, ...props }) => {
  const handleDragEndIfValid = ({source, destination}) => {
    if (!destination || destination.index === source.index) {
      return;
    }
    onDragEnd(source.index, destination.index)
  }
  return(
    <DragDropContext onDragEnd={handleDragEndIfValid} onBeforeCapture={onBeforeCapture}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={className}>
            <WrappedComponent {...props} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
