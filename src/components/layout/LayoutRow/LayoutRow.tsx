import * as React from 'react';
import * as classNames from 'classnames';

interface Props {
  className?: string;
  componentClass?: any;
  propsForComponent?: object;
}

const LayoutRow: React.SFC<Props> = (props) => {
  const {
    componentClass: Component,
    propsForComponent,
    className,
    ...otherProps
  } = props;

  return (
    <Component {...otherProps} className={classNames(className, 'row')} {...propsForComponent}/>
  );
};

LayoutRow.defaultProps = {
  componentClass: 'div'
};

export default LayoutRow;