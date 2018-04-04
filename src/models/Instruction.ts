import { SBrickCommand } from './SBrickCommand';

export interface Instruction {
  id: string;
  displayName: string;
  sBrickCommand: SBrickCommand;
}
