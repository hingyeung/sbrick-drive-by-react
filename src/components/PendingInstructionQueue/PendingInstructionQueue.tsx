import * as React from 'react';
import './PendingInstructionQueue.css';
import InstructionList from '../InstructionList/InstructionList';

export const DROPPABLE_ID = 'pending-instruction-queue-droppable';

interface Props {
  decorateForDragInProgress: boolean;
  children: any;
}

export default (props: Props) => (
  <InstructionList droppabledId={DROPPABLE_ID} {...props} className="pending-instruction-queue">
    {props.children}
  </InstructionList>
);