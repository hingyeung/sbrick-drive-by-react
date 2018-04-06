import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Instruction } from '../../models/Instruction';
// import './InstructionCard.css';

export interface Props {
  instruction: Instruction;
  index: number;
  className?: string;
}

export default (props: Props) => (
  <Draggable draggableId={props.instruction.id} index={props.index}>
    {(provided, snapshot) => (
      <div className={props.className + ' instruction-card'}>
        <div
          ref={provided.innerRef}
          className="instruction-card"
          style={{...provided.draggableProps.style as object}}
          {...provided.dragHandleProps}
        >
          {props.instruction.displayName}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);