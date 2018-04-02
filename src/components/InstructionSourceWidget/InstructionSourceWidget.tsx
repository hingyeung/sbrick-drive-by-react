import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { InstructionSource } from '../../models/InstructionSource';
import './InstructionSourceWidget.css';

interface InstructionSourceWidgetPropsType {
  instruction: InstructionSource;
  index: number;
}

export default (props: InstructionSourceWidgetPropsType) => (
  <Draggable draggableId={props.instruction.id} index={props.index}>
    {(provided, snapshot) => {
      return (
        <div>
          <div
            ref={provided.innerRef}
            className="instruction-source"
            style={{...provided.draggableProps.style as object}}
            {...provided.dragHandleProps}
          >
            <div className="display-name">{props.instruction.displayName}</div>
          </div>
          {provided.placeholder}
        </div>
      );
    }}
  </Draggable>
);