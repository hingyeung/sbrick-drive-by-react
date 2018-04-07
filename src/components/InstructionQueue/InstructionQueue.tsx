import * as React from 'react';
import './InstructionQueue.css';
import InstructionList from '../InstructionList/InstructionList';

export const DROPPABLE_ID = 'pending-instruction-queue-droppable';

interface Props {
  children: any;
}

export default (props: Props) => (
  <InstructionList droppabledId={DROPPABLE_ID} {...props} className="pending-instruction-queue">
    {props.children}
  </InstructionList>
);