import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './InstructionSourceContainer.css';

const getListStyle = (isDraggingOver: boolean): object => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: 250
});

export const DROPPABLE_ID = 'instruction-source-container-droppable';

export default (props: any) => (
  <Droppable droppableId={DROPPABLE_ID}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        className={`instruction-source-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
      >
        {props.children}
      </div>
    )}
  </Droppable>
);