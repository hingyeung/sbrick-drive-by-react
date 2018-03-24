import * as React from 'react';
// import {Component} from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Item {
    id: string;
    content: string;
}

// interface TodoListProps extends React.Props<TodoList> {
//
// }

interface TodoListState {
    items: Item[];
}

const getItemStyle = (draggableStyle: any, isDragging: boolean): Object => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,

    margin: draggableStyle && draggableStyle.margin ? draggableStyle.margin : `0 0 ${8}px 0`,
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: 8,
    width: 250
});

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class TodoList extends React.Component<{}, TodoListState> {

    constructor(props: any) {
        super(props);

        this.state = {
            items: [
                {id: '0', content: 'Hello'}
            ]
        };
    }

    onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(dropProvided, dropSnapshot) => (
                        <div
                            ref={dropProvided.innerRef}
                            style={getListStyle(dropSnapshot.isDraggingOver)}
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(dragProvided, dragSnapshot) => (
                                        <div>
                                            <div
                                                ref={dragProvided.innerRef}
                                                style={getItemStyle(
                                                    dragProvided.draggableProps.style,
                                                    dragSnapshot.isDragging
                                                )}
                                                {...dragProvided.dragHandleProps}
                                            >
                                                {item.content}
                                            </div>
                                            {dragProvided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}