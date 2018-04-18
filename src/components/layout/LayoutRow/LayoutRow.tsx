import * as React from 'react';
import * as classNames from 'classnames';

export interface Props {
  extraClassNames?: string;
  children: JSX.Element | JSX.Element[];
}

export default (props: Props) => {
  return (
    // add row prop to children, not adding a useless wrapper div.
    <div className={classNames(props.extraClassNames, 'row')}>
      {props.children}
    </div>
  );
};