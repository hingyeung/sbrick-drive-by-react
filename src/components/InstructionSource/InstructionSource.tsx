import * as React from 'react';
import './InstructionSource.css';
import InstructionList from '../InstructionList/InstructionList';

export const DROPPABLE_ID = 'template-instruction-list-droppable';

interface Props {
  children: any;
}

export default (props: Props) => (
  <InstructionList droppabledId={DROPPABLE_ID} {...props} className="template-instruction-list">
    {props.children}
  </InstructionList>
);