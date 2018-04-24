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

const buildClassesForInstructionCard = (className: string | undefined, isDragging: boolean) => {
  return [
    'col',
    'instruction-card',
    isDragging ? 'instruction-card--is-dragging' : '',
    className ? className : '',
    className && isDragging ? `${className}--is-dragging` : '',
  ].join(' ').trim();
};

export default (props: Props) => (
  <Draggable draggableId={props.instruction.id} index={props.index}>
    {(provided, snapshot) => (
      // can't use LayoutRow and LayoutCol here because "ref" attribute is not available to SFC
      <div className="row">
        <div
          ref={provided.innerRef}
          className={buildClassesForInstructionCard(props.className, snapshot.isDragging)}
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