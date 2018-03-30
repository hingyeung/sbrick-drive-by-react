import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Instruction } from '../../models/Instruction';
import './InstructionWidget.css';

interface InstructionWidgetProps {
    instruction: Instruction;
    index: number;
}

export default (props: InstructionWidgetProps) => (
    <Draggable draggableId={props.instruction.id} index={props.index}>
        {(provided, snapshot) => (
            <div>
                <div
                    ref={provided.innerRef}
                    className="instruction"
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