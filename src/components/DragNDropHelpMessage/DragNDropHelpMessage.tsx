import * as React from 'react';
import './DragNDropHelpMessage.css';
// @ts-ignore
import dragIcon from '../../assets/drag.svg';

const DragNDropHelpMessage: React.SFC<any> = (props) => {
  return (
    <div className="dnd-help-message col">
      <div className="dnd-help-message__icon"><img src={dragIcon}/></div>
      <div className="dnd-help-message__caption">Add instructions</div>
      <div className="dnd-help-message__sub-caption">Simply drag and drop</div>
    </div>
  );
};

export default DragNDropHelpMessage;