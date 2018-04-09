import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import * as React from 'react';
import './TemplateInstructionList.css';

export interface Props {
  droppabledId: string;
  // instructions: Instruction[];
  className?: string;
  children: any;
}

export default (props: Props) => (
  <Droppable droppableId={props.droppabledId}>
    {(provided: DroppableProvided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={
          props.className +
          ' instruction-list ' +
          (snapshot.isDraggingOver ? ` instruction-list--dragging-over ${props.className}--dragging-over` : '')
        }
      >
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);