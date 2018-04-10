import * as React from 'react';
import { Instruction } from '../../models/Instruction';
// https://github.com/facebook/jest/issues/936#issuecomment-214556122
// rbd is used to mock 'react-beautiful-dnd'
import * as rbd from 'react-beautiful-dnd';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { SBrickCommand } from '../../models/SBrickCommand';
import InstructionCard from './InstructionCard';
import { mount } from 'enzyme';

jest.mock('react-beautiful-dnd');

const INSTRUCTION: Instruction = {
  id: 'instructionId',
  displayName: 'displayName',
  sBrickCommand: SBrickCommand.forward
};

const mockingReactBeautifulDnd = (isDragging: boolean) => {
  const draggableProvided: DraggableProvided = {
    innerRef: () => {
      return;
    },
    draggableProps: {
      style: null,
      'data-react-beautiful-dnd-draggable': ''
    },
    dragHandleProps: null
  };
  const draggableStateSnapshot: DraggableStateSnapshot = {
    isDragging: isDragging
  };
  // even though tslint is complaining about "attempted to assign to readonly property",
  // it works, and I don't know how to do it any other way.
  // @ts-ignore
  rbd.Draggable = ({children}: any) => (<div>{children(draggableProvided, draggableStateSnapshot)}</div>);
};

describe('InstructionCard', function () {
  it('should render properly', () => {
    mockingReactBeautifulDnd(false);

    const wrapper = mount(
        <InstructionCard index={0} instruction={INSTRUCTION} icon="icon" className="extraClass"/>
      );

    const instructionCard = wrapper.find('.instruction-card');
    expect(instructionCard).toHaveLength(1);
    expect(instructionCard.hasClass('extraClass')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render properly when dragging', () => {
    mockingReactBeautifulDnd(true);

    const wrapper = mount(
        <InstructionCard index={0} instruction={INSTRUCTION} icon="icon" className="extraClass"/>
      );

    const instructionCard = wrapper.find('.instruction-card');
    expect(instructionCard).toHaveLength(1);
    expect(instructionCard.hasClass('extraClass')).toBeTruthy();
    expect(instructionCard.hasClass('instruction-card--is-dragging')).toBeTruthy();
    expect(instructionCard.hasClass('extraClass--is-dragging')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});