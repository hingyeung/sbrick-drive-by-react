import * as React from 'react';
import './InstructionQueueContainer.css';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

export default (props: any) => (
    <Droppable droppableId="instruction-queue-container">
        {(provided: DroppableProvided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="instruction-queue-container">
                provider
                {provided.placeholder}
            </div>
        )}

    </Droppable>
);
