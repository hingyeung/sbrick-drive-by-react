import * as React from 'react';
import InstructionCard, { Props as InstructionCardProps } from '../InstructionCard/InstructionCard';
import './TemplateInstructionCard.css';
// @ts-ignore
import ForwardIcon from '../../assets/instruction-forward.svg';

export const TemplateInstructionCard = (props: InstructionCardProps) => {
  // const icon = require(`../../assets/instruction-${props.instruction.displayName}.svg`);
  return <InstructionCard {...props} className="template-instruction-card" icon={ForwardIcon}/>;
};