import * as React from 'react';
import InstructionCard, { Props as InstructionCardProps } from '../InstructionCard/InstructionCard';
import './PendingInstructionCard.css';
import { getIconForSBrickCommand } from '../../commons/IconUtils';

export const PendingInstructionCard = (props: InstructionCardProps) => {
  const icon = getIconForSBrickCommand(props.instruction.sBrickCommand);
  return <InstructionCard {...props} className="pending-instruction-card" icon={icon}/>;
};