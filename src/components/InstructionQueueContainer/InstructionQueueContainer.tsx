import * as React from 'react';
import './InstructionQueueContainer.css';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Instruction } from '../../models/Instruction';

interface InstructionQueueContainerProps {
  instructions: Instruction[];
  children: any;
}

export const DROPPABLE_ID = 'instruction-queue-container-droppable';

export default (props: InstructionQueueContainerProps) => (
  <Droppable droppableId={DROPPABLE_ID}>
    {(provided: DroppableProvided, snapshot) => (
      <div ref={provided.innerRef} {...provided.droppableProps} className="instruction-queue-container">
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);
