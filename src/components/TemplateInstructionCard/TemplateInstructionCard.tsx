import * as React from 'react';
import InstructionCard, { Props as InstructionCardProps } from '../InstructionCard/InstructionCard';
import './TemplateInstructionCard.css';

import { getIconForSBrickCommand } from '../../commons/IconUtils';

export const TemplateInstructionCard = (props: InstructionCardProps) => {
  const icon = getIconForSBrickCommand(props.instruction.sBrickCommand);
  return <InstructionCard {...props} className="template-instruction-card" icon={icon}/>;
};