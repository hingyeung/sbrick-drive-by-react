import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import * as React from 'react';
import './App.css';
import { InstructionSource } from './models/InstructionSource';
import InstructionSourceWidget from './components/InstructionSourceWidget/InstructionSourceWidget';
import InstructionQueueContainer,
{
    DROPPABLE_ID as InstructionQueueContainerDroppableId
} from './components/InstructionQueueContainer/InstructionQueueContainer';
import InstructionSourceContainer,
{
    DROPPABLE_ID as InstructionSourceContainerDroppableId
} from './components/InstructionSourceContainer/InstructionSourceContainer';
import { Instruction } from './models/Instruction';
import InstructionWidget from './components/InstructionWidget/InstructionWidget';

interface State {
    instructionSource: InstructionSource[];
    instructionQueue: Instruction[];
    status: string;
}

// const grid = 8;

// const getListStyle = (isDraggingOver: boolean): object => ({
//     background: isDraggingOver ? 'lightblue' : 'lightgrey',
//     padding: grid,
//     width: 250
// });

// fake data generator
const getInstructionSources = (count: number): InstructionSource[] =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `instructionSource-${k}`,
        index: k,
        displayName: `instruction ${k}`,
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
            instructionSource: getInstructionSources(3),
            instructionQueue: [],
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
    onDragEnd = (result: DropResult) => {
        this.updateStatus(result);

        if (this.draggedFromInstructionSourceToInstructionQueue(result)) {
            this.addInstructionToInstructionQueue(result);
        }
    }

    addInstructionToInstructionQueue(result: DropResult) {
        const instructionSourceDragged = this.state.instructionSource[result.source.index];
        const newInstruction: Instruction = {
            displayName: instructionSourceDragged.displayName,
            id: `instruction-${this.state.instructionQueue.length}`,
            index: this.state.instructionQueue.length
        };
        this.setState({
            instructionQueue: this.state.instructionQueue.concat(newInstruction)
        });
    }

    updateStatus(result: DropResult): void  {
        this.setState({
            status: `onDragEnd ${result.draggableId}
                src: ${`${result.source.droppableId}:${result.source.index}`} 
                dest: ${result.destination ?
                `${result.destination.droppableId}:${result.destination.index}` :
                'no-dest'}`
        });
    }

    draggedFromInstructionSourceToInstructionQueue = (result: DropResult) => {
        return result && result.destination && result.source &&
            result.source.droppableId === InstructionSourceContainerDroppableId &&
            result.destination.droppableId === InstructionQueueContainerDroppableId;
    }

    buildDraggableContent = () => {
        return this.state.instructionSource.map((instructionSource, index) => {
            return (
                <InstructionSourceWidget key={index} instruction={instructionSource}/>
            );
        });
    }

    buildInstructionDroppables = () => {
        return this.state.instructionQueue.map((instruction, index) => {
            return (
                <InstructionWidget key={index} instruction={instruction}/>
            );
        });
    }

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <div className="app-container">
                    <InstructionSourceContainer>
                        {this.buildDraggableContent()}
                    </InstructionSourceContainer>
                    <InstructionQueueContainer instructions={this.state.instructionQueue}>
                        {this.buildInstructionDroppables()}
                    </InstructionQueueContainer>
                </div>
                <div>{this.state.status}</div>
            </DragDropContext>
        );
    }
}
