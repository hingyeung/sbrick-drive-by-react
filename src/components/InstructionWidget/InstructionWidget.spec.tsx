import * as renderer from 'react-test-renderer';
import * as React from 'react';
import { Instruction } from '../../models/Instruction';
import InstructionWidget from './InstructionWidget';
// https://github.com/facebook/jest/issues/936#issuecomment-214556122
// rbd is used to mock 'react-beautiful-dnd'
import * as rbd from 'react-beautiful-dnd';
import { DraggableProvided } from 'react-beautiful-dnd';
import { SBrickCommand } from '../../models/SBrickCommand';

jest.mock('react-beautiful-dnd');

const INSTRUCTION: Instruction = {
  id: 'instructionId',
  displayName: 'displayName',
  sBrickCommand: SBrickCommand.forward
};

describe('InstructionWidget', function () {
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
        <InstructionWidget index={0} instruction={INSTRUCTION}/>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  // it.only('should display instruction displayName', () => {
  //     const tree = renderer.create(
  //             <InstructionWidget index={0} instruction={INSTRUCTION}/>
  //         );
  //     expect(tree).toContain('displayName');
  // });
});