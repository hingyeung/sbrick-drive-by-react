import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import * as React from 'react';
import './App.css';
import { InstructionSource } from './models/InstructionSource';
import InstructionSourceWidget from './components/InstructionSourceWidget/InstructionSourceWidget';
import InstructionQueueContainer, {
  DROPPABLE_ID as InstructionQueueContainerDroppableId
} from './components/InstructionQueueContainer/InstructionQueueContainer';
import InstructionSourceContainer, {
  DROPPABLE_ID as InstructionSourceContainerDroppableId
} from './components/InstructionSourceContainer/InstructionSourceContainer';
import { Instruction } from './models/Instruction';
import InstructionWidget from './components/InstructionWidget/InstructionWidget';
import { insert, reorder } from './commons/ListUtils';

export interface State {
  instructionSource: InstructionSource[];
  instructionQueue: Instruction[];
  status?: string;
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
    //
  }
  onDragUpdate = () => {
    //
  }
  onDragEnd = (result: DropResult) => {
    this.updateStatus(result);

    if (this.isDraggedFromSrcToDest(
        result,
        InstructionSourceContainerDroppableId,
        InstructionQueueContainerDroppableId)) {
      this.addInstructionToInstructionQueue(result);
    }

    if (this.isDraggedFromSrcToDest(
        result,
        InstructionQueueContainerDroppableId,
        InstructionQueueContainerDroppableId)) {
      this.reorderInstructionsWithinInstructionQueue(result);
    }
  }

  reorderInstructionsWithinInstructionQueue(result: DropResult) {
    this.setState({
      instructionQueue: reorder(this.state.instructionQueue, result.source.index, result.destination!.index)
    });
  }

  isDraggedFromSrcToDest(result: DropResult, srcDroppableId: string, destDroppableId: string) {
    return result && result.source && result.destination &&
      result.source.droppableId === srcDroppableId &&
      result.destination.droppableId === destDroppableId;
  }

  addInstructionToInstructionQueue(result: DropResult) {
    const instructionSourceDragged = this.state.instructionSource[result.source.index];
    const newInstruction: Instruction = {
      displayName: instructionSourceDragged.displayName,
      id: `instruction-${this.state.instructionQueue.length}`
    };
    this.setState({
      // "!" is non-null assertion operator, telling transpiler to be relaxed about the null-check
      instructionQueue: insert(this.state.instructionQueue, result.destination!.index, newInstruction)
    });
  }

  updateStatus(result: DropResult): void {
    this.setState({
      status: `onDragEnd ${result.draggableId}
                src: ${`${result.source.droppableId}:${result.source.index}`} 
                dest: ${result.destination ?
        `${result.destination.droppableId}:${result.destination.index}` :
        'no-dest'}`
    });
  }

  buildInstructionSourceContent = () => {
    return this.state.instructionSource.map((instructionSource, index) => {
      return (
        <InstructionSourceWidget key={index} index={index} instruction={instructionSource}/>
      );
    });
  }

  buildInstructionDroppables = () => {
    return this.state.instructionQueue.map((instruction, index) => {
      return (
        <InstructionWidget key={index} index={index} instruction={instruction}/>
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
            {this.buildInstructionSourceContent()}
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
