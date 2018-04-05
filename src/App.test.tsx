import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { State } from './App';
import { DraggableId, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { mount, shallow } from 'enzyme';
import {
  DROPPABLE_ID as InstructionQueueDroppableId
} from './components/InstructionQueueContainer/InstructionQueueContainer';
import {
  DROPPABLE_ID as InstructionSourceDroppableId
} from './components/InstructionSourceContainer/InstructionSourceContainer';
import { drive } from './services/SBrickService/SBrickService';

jest.mock('./services/SBrickService/SBrickService', () => ({
  'drive': jest.fn().mockImplementation(() => Promise.resolve({}))
}));

const makeInstruction = (index: number) => ({
  displayName: `displayName${index}`,
  id: `instruction-${index}`,
  sBrickCommand: index % 3
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

const makeInstructions = (n: number) => {
  return Array.from({length: n}, (v, i) => i).map((i) => makeInstruction(i));
};

describe('App', function () {
  beforeEach(() => {
    // drive.mockClear();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });

  it('should add instruction to InstructionQueue when InstructionQueus is empty', () => {
    const state: State = {
      instructionSource: makeInstructions(2),
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
      instructionQueue: makeInstructions(2)
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
      instructionQueue: makeInstructions(2)
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

  it('should send instructions to backend in the correct order', (done) => {
    const state: State = {
      instructionSource: [],
      instructionQueue: makeInstructions(3)
    };

    const onInstructionExecuted = (result: any) => {
      expect(drive).toHaveBeenCalledTimes(3);
      expect(drive.mock.calls).toEqual([[0], [1], [2]]);
      done();
    };

    const wrapper = shallow(<App onInstructionsExecuted={onInstructionExecuted}/>);
    wrapper.setState(state);
    wrapper.find('.play-btn').simulate('click');
  });
});
