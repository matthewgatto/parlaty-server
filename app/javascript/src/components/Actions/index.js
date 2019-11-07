import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ActionInput from '../ActionInput';
import ActionWell from '../ActionWell';
import Text from '../Text';
import styles from './index.module.css';

class Actions extends React.PureComponent {
  handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return;
    }
    this.props.reorderAction(source.index, destination.index)
  }
  render(){
    return(
      <>
      <Text className={styles.label}>Actions</Text>
      <div className={styles.container}>
        {this.props.steps &&
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
                  {this.props.steps.map((step, i) =>
                    <Draggable key={step} draggableId={step} index={i}>
                      {(provided, snapshot) => <ActionInput idx={i} {...provided.dragHandleProps} {...provided.draggableProps} setRef={provided.innerRef} />}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        }
        <ActionWell
          color="secondary"
          text="Add Action"
          className={styles.button}
          leftIcon={
            <svg className={styles.icon} width="1.4em" height="1.4em" viewBox="0 0 150 150">
            	<line fill="none" stroke="#7b7979" strokeWidth="46" x1="75" y1="0" x2="75" y2="150"/>
            	<line fill="none" stroke="#7b7979" strokeWidth="46" x1="0" y1="75" x2="150" y2="75"/>
            </svg>
          }
          onClick={this.props.addAction}
        />
      </div>
      </>
    )
  }
}

export default Actions;
