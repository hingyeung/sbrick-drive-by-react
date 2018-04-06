import * as React from 'react';
import InstructionCard, { Props as InstructionCardProps } from '../InstructionCard/InstructionCard';
import './TemplateInstructionCard.css';

export const TemplateInstructionCard = (props: InstructionCardProps) => {
  return <InstructionCard className="template-instruction-card" instruction={props.instruction} index={props.index}/>;
};