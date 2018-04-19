import * as React from 'react';
import * as classNames from 'classnames';

interface Props {
  className?: string;
  componentClass?: any;
}

const LayoutRow: React.SFC<Props> = (props) => {
  const {
    componentClass: Component,
    className,
    ...otherProps
  } = props;

  return (
    <Component {...otherProps} className={classNames(className, 'row')}/>
  );
};

LayoutRow.defaultProps = {
  componentClass: 'div'
};

export default LayoutRow;