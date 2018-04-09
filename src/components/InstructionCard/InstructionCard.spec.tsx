import * as renderer from 'react-test-renderer';
import * as React from 'react';
import { Instruction } from '../../models/Instruction';
// https://github.com/facebook/jest/issues/936#issuecomment-214556122
// rbd is used to mock 'react-beautiful-dnd'
import * as rbd from 'react-beautiful-dnd';
import { DraggableProvided } from 'react-beautiful-dnd';
import { SBrickCommand } from '../../models/SBrickCommand';
import InstructionCard from './InstructionCard';

jest.mock('react-beautiful-dnd');

const INSTRUCTION: Instruction = {
  id: 'instructionId',
  displayName: 'displayName',
  sBrickCommand: SBrickCommand.forward
};

describe('InstructionCard', function () {
  beforeEach(() => {
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
    // even though tslint is complaining about "attempted to assign to readonly property",
    // it works, and I don't know how to do it any other way.
    // @ts-ignore
    rbd.Draggable = ({children}: any) => (<div>{children(draggableProvided)}</div>);
  });

  it('should render properly', () => {
    const tree = renderer
      .create(
        <InstructionCard index={0} instruction={INSTRUCTION} icon="icon"/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});