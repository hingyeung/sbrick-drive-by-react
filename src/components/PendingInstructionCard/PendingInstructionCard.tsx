import * as React from 'react';
import InstructionCard, { Props as InstructionCardProps } from '../InstructionCard/InstructionCard';
import './PendingInstructionCard.css';

export const PendingInstructionCard = (props: InstructionCardProps) => {
  return <InstructionCard {...props} className="pending-instruction-card"/>;
};