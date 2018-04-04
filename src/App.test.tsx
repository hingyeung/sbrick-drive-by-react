import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { State } from './App';
import { DraggableId, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { mount } from 'enzyme';
import {
  DROPPABLE_ID as InstructionQueueDroppableId
} from './components/InstructionQueueContainer/InstructionQueueContainer';
import {
  DROPPABLE_ID as InstructionSourceDroppableId
} from './components/InstructionSourceContainer/InstructionSourceContainer';
import { SBrickCommand } from './models/SBrickCommand';

const makeInstruction = (index: number) => ({
  displayName: `displayName${index}`,
  id: `instruction-${index}`,
  sBrickCommand: SBrickCommand.forward
});

const buildDropResultFor = (draggableId: DraggableId,
                            source: DraggableLocation,
                            destination: DraggableLocation | null): DropResult => ({
  draggableId: draggableId,
  type: 'type',
  source: source,
  destination: destination,
  reason: 'DROP'
});
describe('App', function () {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });

  it('should add instruction to InstructionQueue when InstructionQueus is empty', () => {
    const state: State = {
      instructionSource: [
        makeInstruction(0),
        makeInstruction(1)
      ],
      instructionQueue: []
    };
    const result: DropResult = buildDropResultFor(
      'instruction-0',
      {
        droppableId: InstructionSourceDroppableId,
        index: 0
      },
      {
        droppableId: InstructionQueueDroppableId,
        index: 0
      }
    );

    const wrapper = mount(<App/>);
    wrapper.setState(state);
    wrapper.instance().onDragEnd(result);

    const updatedInstructionQUeue = wrapper.state('instructionQueue');
    expect(updatedInstructionQUeue.length).toBe(1);
    expect(updatedInstructionQUeue[0].id).toBe('instruction-0');
  });

  it('should reorder instructions in InstructionQueue', () => {
    const state: State = {
      instructionSource: [],
      instructionQueue: [
        makeInstruction(0),
        makeInstruction(1)
      ]
    };
    const result: DropResult = buildDropResultFor(
      'instruction-0',
      {
        droppableId: InstructionQueueDroppableId,
        index: 0
      },
      {
        droppableId: InstructionQueueDroppableId,
        index: 1
      }
    );

    const wrapper = mount(<App/>);
    wrapper.setState(state);
    wrapper.instance().onDragEnd(result);

    const updatedInstructionQueue = wrapper.state('instructionQueue');
    expect(updatedInstructionQueue.length).toBe(2);
    expect(updatedInstructionQueue[0].id).toBe('instruction-1');
    expect(updatedInstructionQueue[1].id).toBe('instruction-0');
  });

  it('should remove instruction from InstructionQueue', () => {
    const state: State = {
      instructionSource: [],
      instructionQueue: [
        makeInstruction(0),
        makeInstruction(1)
      ]
    };
    const result: DropResult = buildDropResultFor(
      'instruction-0',
      {
        droppableId: InstructionQueueDroppableId,
        index: 0
      },
      null
    );

    const wrapper = mount(<App/>);
    wrapper.setState(state);
    wrapper.instance().onDragEnd(result);

    const updatedInstructionQueue = wrapper.state('instructionQueue');
    expect(updatedInstructionQueue.length).toBe(1);
    expect(updatedInstructionQueue[0].id).toBe('instruction-1');
  });
});
