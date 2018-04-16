import * as React from 'react';
import * as classNames from 'classnames';

export interface Props {
  extraClassNames: string;
  children: JSX.Element | JSX.Element[];
}

export default (props: Props) => {
  return (
    <div className={classNames(props.extraClassNames, 'container')}>
        {props.children}
    </div>
  );
};