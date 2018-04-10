import { SBrickCommand } from '../models/SBrickCommand';
// @ts-ignore
import ForwardIcon from '../assets/instruction-forward.svg';
// @ts-ignore
import BackwardIcon from '../assets/instruction-backward.svg';
// @ts-ignore
import LeftIcon from '../assets/instruction-left.svg';
// @ts-ignore
import RightIcon from '../assets/instruction-right.svg';
// @ts-ignore
import UnknownIcon from '../assets/instruction-unknown.svg';

export const getIconForSBrickCommand = (command: SBrickCommand): object => {
  switch (command) {
    case SBrickCommand.forward:
      return ForwardIcon;
    case SBrickCommand.backward:
      return BackwardIcon;
    case SBrickCommand.left:
      return LeftIcon;
    case SBrickCommand.right:
      return RightIcon;
    default:
      return UnknownIcon;
  }
};