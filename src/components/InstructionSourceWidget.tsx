import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { InstructionSource } from '../models/InstructionSource';
import './InstructionSourceWidget.css';

interface InstructionSourceWidgetPropsType {
    instruction: InstructionSource;
}

export default (props: InstructionSourceWidgetPropsType) => (
    <Draggable draggableId={props.instruction.id as any as string} index={props.instruction.id}>
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

/*
<Draggable draggableId={item.id} index={index} key={item.id}>
    {(provided, snapshot) => {
        // this line is need to cast DraggableStyle to Object, so that
        // type checking of style prop will pass for React.
        const myStyle: Object = {...provided.draggableProps.style};
        return (
            <div>
                <div
                    ref={provided.innerRef}
                    // style={getItemStyle(
                    //     provided.draggableProps.style,
                    //     snapshot.isDragging
                    // )}
                    style={myStyle}
                    // style={provided.draggableProps.style}
                    {...provided.dragHandleProps}
                    className={`${this.state.items[index].status} draggable-item`}
                >
                    {item.content}
                </div>
                {provided.placeholder}
            </div>
        );
    }}
</Draggable>
*/