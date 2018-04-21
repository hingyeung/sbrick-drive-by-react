import * as React from 'react';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
import LayoutContainer from '../layout/LayoutContainer/LayoutContainer';
import LayoutCol from '../layout/LayoutCol/LayoutCol';

export interface ControlPanelProps {
  onPlayClick: (event: any) => void;
  onClearCLick: (event: any) => void;
}

export default (props: ControlPanelProps) => {
  return (
    <LayoutContainer>
      <LayoutRow>
        <LayoutCol sm={6}>
          <button className="control-container__play-btn btn" onClick={props.onPlayClick}>Play</button>
        </LayoutCol>
        <LayoutCol sm={6}>
          <button className="control-container__clear-btn btn" onClick={props.onClearCLick}>Clear</button>
        </LayoutCol>
      </LayoutRow>
    </LayoutContainer>
  );
};