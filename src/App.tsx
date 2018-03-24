import { DragDropContext, DragStart, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import * as React from 'react';
import './App.css';
// import InstructionSourceWidget from './components/InstructionSourceWidget';
import { InstructionSource } from './models/InstructionSource';
import InstructionSourceWidget from './components/InstructionSourceWidget';

// interface Item  {
//     id: string;
//     content: string;
//     status?: string;
// }

interface State {
    items: InstructionSource[];
    status: string;
}

const grid = 8;

const getListStyle = (isDraggingOver: boolean): object => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

// fake data generator
const getItems = (count: number): InstructionSource[] =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: k,
        displayName: `item ${k}`,
        command: ''
    }));

// const getItemStyle = (draggableStyle: any, isDragging: boolean): Object => ({
//     // some basic styles to make the items look a bit nicer
//     // userSelect: 'none',
//     // padding: grid * 2,
//
//     // change background colour if dragging
//     // background: isDragging ? 'lightgreen' : 'grey',
//
//     // styles we need to apply on draggables
//     ...draggableStyle,
//
//     // margin: draggableStyle && draggableStyle.margin ? draggableStyle.margin : `0 0 ${grid}px 0`,
// });

// a little function to help us with reordering the result
// const reorder = (list: any[], startIndex: number, endIndex: number) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//
//     return result;
// };

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: getItems(3),
            status: 'unknown'
        };
    }

    onDragStart = (start: DragStart) => {
        /*...*/
        this.setState({
            status: `onDragStart ${start.source.index}`
        });
    }
    onDragUpdate = () => {
        /*...*/
        this.setState({
            status: 'onDragUpdate'
        });
    }
    onDragEnd = (result: any) => {
        // the only one that is required
        this.setState({
            status: `onDragEnd ${result.draggableId} ${result.source.index} ${result.destination.index}`
        });
    }

    buildDraggableContent = () => {
        return this.state.items.map((item, index) => {
            return (
                <InstructionSourceWidget key={index} instruction={item}/>
            );
        });
    }

    droppableChildFunc = (dropProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
            ref={dropProvided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
        >
            {this.buildDraggableContent()}
        </div>
    )

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Droppable droppableId="droppable">
                    {this.droppableChildFunc}
                </Droppable>
                <div>{this.state.status}</div>
            </DragDropContext>
        );
    }
}

// export default App;
/*
<InstructionSourceWidget key={index} instruction={item}/>

<Draggable draggableId={item.id as any as string} index={index} key={item.id}>
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
                                    className={`${this.state.items[index]} draggable-item`}
                                >
                                    {item.displayName}
                                </div>
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Draggable>
*/