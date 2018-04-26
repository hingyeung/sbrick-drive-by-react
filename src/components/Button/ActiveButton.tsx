import * as React from 'react';
import Button, { ButtonProps } from './Button';
import * as classNames from 'classnames';
import './ActiveButton.css';

const ActiveButton: React.SFC<ButtonProps> = (props) => {
  const {
    className,
    ...otherProps
  } = props;

  return <Button {...otherProps} className={classNames('active-btn', className)}/>;
};

export default ActiveButton;