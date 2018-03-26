import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const getListStyle = (isDraggingOver: boolean): object => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
});

export default (props: any) => (
    <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className={snapshot.isDraggingOver ? 'dragging-over' : ''}
            >
                {props.children}
            </div>
        )}
    </Droppable>
);