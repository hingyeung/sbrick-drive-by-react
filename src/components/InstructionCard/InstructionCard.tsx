import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Instruction } from '../../models/Instruction';
import './InstructionCard.css';

export interface Props {
  instruction: Instruction;
  index: number;
  className?: string;
  icon?: any;
}

export default (props: Props) => (
  <Draggable draggableId={props.instruction.id} index={props.index}>
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          className={[
            (props.className ? props.className : ''),
            'instruction-card'
          ].join(' ')}
          style={{...provided.draggableProps.style as object}}
          {...provided.dragHandleProps}
        >
          <img className="instruction-card__icon" src={props.icon} />
          <span className="instruction-card__label">{props.instruction.displayName}</span>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);