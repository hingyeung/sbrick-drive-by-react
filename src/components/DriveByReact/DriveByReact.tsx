import * as React from 'react';
import { Component } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { Instruction } from '../../models/Instruction';
import TemplateInstructionList, {
  DROPPABLE_ID as InstructionSourceContainerDroppableId
} from '../TemplateInstructionList/TemplateInstructionList';
import PendingInstructionQueue, {
  DROPPABLE_ID as InstructionQueueContainerDroppableId
} from '../PendingInstructionQueue/PendingInstructionQueue';
import { SBrickCommand } from '../../models/SBrickCommand';
import { AsyncFunction, series } from 'async';
import { insert, remove, reorder } from '../../commons/ListUtils';
import { drive } from '../../services/SBrickService/SBrickService';
import './DriveByReact.css';
import { TemplateInstructionCard } from '../TemplateInstructionCard/TemplateInstructionCard';
import { PendingInstructionCard } from '../PendingInstructionCard/PendingInstructionCard';

interface DriveByReactProps {
  onInstructionsExecuted?: (result: any) => void;
}

export interface State {
  instructionSource: Instruction[];
  instructionQueue: Instruction[];
  dragInProgress: boolean;
  status?: string;
}

// const grid = 8;

// const getListStyle = (isDraggingOver: boolean): object => ({
//     background: isDraggingOver ? 'lightblue' : 'lightgrey',
//     padding: grid,
//     width: 250
// });
const getInstructionSource = (): Instruction[] =>
  Array.from(
    [
      SBrickCommand.forward, SBrickCommand.backward, SBrickCommand.left, SBrickCommand.right],
    (cmd, index) => ({
      id: `instruction-${SBrickCommand[cmd]}`,
      index: index,
      displayName: SBrickCommand[cmd],
      sBrickCommand: cmd
    })
  );

export default class DriveByReact extends Component<DriveByReactProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      instructionSource: getInstructionSource(),
      instructionQueue: [],
      dragInProgress: false,
      status: 'unknown'
    };
    this.playInstructionsInQueue = this.playInstructionsInQueue.bind(this);
  }

  onDragStart = (start: DragStart) => {
    this.setDragInProgress(true);
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

    if (this.isDraggedFromSrcToNowhere(
      result,
      InstructionQueueContainerDroppableId)) {
      this.removeInstructionFromIntructionQueue(result);
    }

    this.setDragInProgress(false);
  }

  setDragInProgress(inProgress: boolean) {
    this.setState({
      dragInProgress: inProgress
    });
  }

  reorderInstructionsWithinInstructionQueue(result: DropResult) {
    this.setState({
      instructionQueue: reorder(this.state.instructionQueue, result.source.index, result.destination!.index)
    });
  }

  removeInstructionFromIntructionQueue(result: DropResult) {
    this.setState({
      instructionQueue: remove(this.state.instructionQueue, result.source.index)
    });
  }

  isDraggedFromSrcToNowhere(result: DropResult, srcDroppableId: string) {
    return result && result.source && !result.destination &&
      result.source.droppableId === srcDroppableId;
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
      id: `instruction-${this.state.instructionQueue.length}`,
      sBrickCommand: instructionSourceDragged.sBrickCommand
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
        <TemplateInstructionCard key={index} index={index} instruction={instructionSource}/>
      );
    });
  }

  buildInstructionDroppables = () => {
    return this.state.instructionQueue.map((instruction, index) => {
      return (
        <PendingInstructionCard key={index} index={index} instruction={instruction}/>
      );
    });
  }

  insertInstructionIntoExecutionQueue = () => {
    type asyncCallbackType = (err: any, data: any) => void;

    // let executionQueue: ((callback: asyncCallbackType) => void)[] = [];
    let executionQueue: AsyncFunction<any, any>[] = [];
    this.state.instructionQueue.forEach((instruction) => {
      const executor: (callback: asyncCallbackType) => void = (callback) => {
        drive(instruction.sBrickCommand).then(
          (resp: any) => callback(null, resp.data)).catch(
          (err: any) => callback(err, null));
      };
      executionQueue.push(executor);
    });
    return executionQueue;
  }

  playInstructionsInQueue = (ev: any) => {
    const executionQueue = this.insertInstructionIntoExecutionQueue();
    series(executionQueue, this.props.onInstructionsExecuted);
  }

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

  render() {
    return (
      <div>
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <div className="driveByReact-container container">
            <div className="row">
              <div className="col-sm-4 left-container">
                <div className="row">
                  <label>Available Instructions</label>
                </div>
                <div className="row template-instruction-list-container">
                  <TemplateInstructionList decorateForDragInProgress={this.state.dragInProgress}>
                    {this.buildInstructionSourceContent()}
                  </TemplateInstructionList>
                </div>
                <div className="row control-container">
                  <button
                    className="control-container__play-btn btn"
                    onClick={this.playInstructionsInQueue}
                  >
                    Play
                  </button>
                </div>
              </div>
              <div className="middle-container col-sm-2">
                <div className="middle-container__hint-content">drag -></div>
              </div>
              <div className="col-sm-6 right-container">
                <div className="row">
                  <label>Queued Instructions</label>
                </div>
                <div className="row pending-instruction-queue-container">
                    <PendingInstructionQueue decorateForDragInProgress={this.state.dragInProgress}>
                      {this.buildInstructionDroppables()}
                    </PendingInstructionQueue>
                </div>
              </div>
            </div>
          </div>
          <div>{this.state.status}</div>
        </DragDropContext>
        <footer>
          <div>Icons made by <a
            href="https://www.flaticon.com/authors/dave-gandy"
            title="Dave Gandy"
          >Dave Gandy
          </a> from <a
            href="https://www.flaticon.com/"
            title="Flaticon"
          >www.flaticon.com
          </a> is licensed by <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >CC 3.0 BY
          </a></div>
        </footer>
      </div>
    );
  }
}