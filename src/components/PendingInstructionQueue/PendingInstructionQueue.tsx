import * as React from 'react';
import './PendingInstructionQueue.css';
import InstructionList from '../InstructionList/InstructionList';
import { PendingInstructionCard } from '../PendingInstructionCard/PendingInstructionCard';
import { Instruction } from '../../models/Instruction';
import DragNDropHelpMessage from '../DragNDropHelpMessage/DragNDropHelpMessage';

export const DROPPABLE_ID = 'pending-instruction-queue-droppable';

interface Props {
  decorateForDragInProgress: boolean;
  instructions: Instruction[];
}

const renderInstructionCards = (instructions: Instruction[]) => {
  return instructions.map((instruction, index) => {
    return (
      <PendingInstructionCard key={index} index={index} instruction={instruction}/>
    );
  });
};

export default (props: Props) => (
  <InstructionList
    droppabledId={DROPPABLE_ID}
    {...props}
    className="pending-instruction-queue"
    title="Queued Instructions"
  >
    {props.instructions.length === 0 ? <DragNDropHelpMessage/> : renderInstructionCards(props.instructions)}
  </InstructionList>
);