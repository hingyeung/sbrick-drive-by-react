import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './InstructionSource.css';

export const DROPPABLE_ID = 'instruction-source-droppable';

export default (props: any) => (
  <Droppable droppableId={DROPPABLE_ID}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        className={[
          'instruction-source',
          snapshot.isDraggingOver ? 'instruction-source--dragging-over' : ''
        ].join(' ')}
      >
        {props.children}
      </div>
    )}
  </Droppable>
);