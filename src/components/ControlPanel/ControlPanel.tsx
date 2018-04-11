import * as React from 'react';

export interface ControlPanelProps {
  onPlayClick: (event: any) => void;
  onClearCLick: (event: any) => void;
}

export default (props: ControlPanelProps) => {
  return (
    <div>
      <button className="control-container__play-btn btn" onClick={props.onPlayClick}>Play</button>
      <button className="control-container__clear-btn btn" onClick={props.onClearCLick}>Clear</button>
    </div>
  );
};