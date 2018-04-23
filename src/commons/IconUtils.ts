import { SBrickCommand } from '../models/SBrickCommand';
// @ts-ignore
import ForwardIcon from '../assets/up-arrow.svg';
// @ts-ignore
import BackwardIcon from '../assets/down-arrow.svg';
// @ts-ignore
import LeftIcon from '../assets/left-arrow.svg';
// @ts-ignore
import RightIcon from '../assets/right-arrow.svg';
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