import * as React from 'react';
import './TemplateInstructionList.css';
import InstructionList from '../InstructionList/InstructionList';

export const DROPPABLE_ID = 'template-instruction-list-droppable';

interface Props {
  decorateForDragInProgress: boolean;
  children: any;
}

export default (props: Props) => (
  <InstructionList
    droppabledId={DROPPABLE_ID}
    {...props}
    className="template-instruction-list"
    title="Available Instructions"
  >
    {props.children}
  </InstructionList>
);