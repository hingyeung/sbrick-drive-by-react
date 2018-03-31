import React from 'react';

const provided = {draggableProps: {style: undefined}, innerRef: undefined};
const snapshot = {isDraggingOver: undefined};

export const Draggable = ({children}) => {
    return (
        <div>
            Mock Draggable Component
            {children(provided)}
        </div>
    )
};

export const DragDropContext = ({children}) => {
    return (
        <div>
            Mock DragDropContext Component
            {children}
        </div>
    )
};

export const Droppable = ({children}) => {
    return (
        <div>
            Mock DragDropContext Component
            {children(provided, snapshot)}
        </div>
    )
};