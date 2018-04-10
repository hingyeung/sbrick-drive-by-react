import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import * as React from 'react';
import './InstructionList.css';

export interface Props {
  droppabledId: string;
  decorateForDragInProgress: boolean;
  className?: string;
  children: any;
}

export default (props: Props) => (
  <Droppable droppableId={props.droppabledId}>
    {(provided: DroppableProvided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={[
          props.className,
          'instruction-list',
          (props.decorateForDragInProgress ?
            `instruction-list--drag-in-progress ${props.className}--drag-in-progress` :
            ''),
          (snapshot.isDraggingOver ? ` instruction-list--dragging-over ${props.className}--dragging-over` : '')
        ].join(' ')}
      >
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);