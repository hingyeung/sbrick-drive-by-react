import * as React from 'react';
import InstructionCard, { Props as InstructionCardProps } from '../InstructionCard/InstructionCard';
import './TemplateInstructionCard.css';

export const TemplateInstructionCard = (props: InstructionCardProps) => {
  return <InstructionCard {...props} className="template-instruction-card"/>;
};