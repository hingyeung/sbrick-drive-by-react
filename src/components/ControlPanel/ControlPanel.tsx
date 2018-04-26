import * as React from 'react';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
import LayoutCol from '../layout/LayoutCol/LayoutCol';
import './ControlPanel.css';
import ActiveButton from '../Button/ActiveButton';
// @ts-ignore
import playIcon from '../../assets/play.svg';
import Button from '../Button/Button';

export interface ControlPanelProps {
  onPlayClick: (event: any) => void;
  onClearCLick: (event: any) => void;
}

export default (props: ControlPanelProps) => {
  return (
    <LayoutRow className="control-panel">
      <LayoutCol sm={6}>
        <Button
          iconClasses="far fa-trash-alt"
          className="control-panel__btn control-panel__clear-btn btn"
          onClick={props.onClearCLick}
        >
          Clear
        </Button>
      </LayoutCol>
      <LayoutCol sm={6}>
        {/*<button className="control-panel__btn control-panel__play-btn btn"
        onClick={props.onPlayClick}>Play</button>*/}
        <ActiveButton
          iconClasses="far fa-play-circle"
          className="control-panel__play-btn"
          onClick={props.onPlayClick}
        >
          Play
        </ActiveButton>
      </LayoutCol>
    </LayoutRow>
  );
};