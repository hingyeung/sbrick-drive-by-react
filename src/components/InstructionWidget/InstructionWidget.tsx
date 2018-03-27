import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Instruction } from '../../models/Instruction';

interface InstructionWidgetProps {
    instruction: Instruction;
}

export default (props: InstructionWidgetProps) => (
    <Draggable draggableId={props.instruction.id as any as string} index={props.instruction.id}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                className="instruction"
                style={{...provided.draggableProps.style as object}}
                {...provided.dragHandleProps}
            >
                Instruction
            </div>
        )}
    </Draggable>
);