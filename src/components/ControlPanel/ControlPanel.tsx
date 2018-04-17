import * as React from 'react';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
import LayoutCell from '../layout/LayoutCell/LayoutCell';
import LayoutContainer from '../layout/LayoutContainer/LayoutContainer';

export interface ControlPanelProps {
  onPlayClick: (event: any) => void;
  onClearCLick: (event: any) => void;
}

export default (props: ControlPanelProps) => {
  return (
    <LayoutContainer>
      <LayoutRow>
        <LayoutCell sm={6}>
          <button className="control-container__play-btn btn" onClick={props.onPlayClick}>Play</button>
        </LayoutCell>
        <LayoutCell sm={6}>
          <button className="control-container__clear-btn btn" onClick={props.onClearCLick}>Clear</button>
        </LayoutCell>
      </LayoutRow>
    </LayoutContainer>
  );
};