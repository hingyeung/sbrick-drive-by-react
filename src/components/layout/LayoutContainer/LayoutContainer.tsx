import * as React from 'react';
import * as classNames from 'classnames';

interface Props {
  className?: string;
  componentClass?: any;
}

const LayoutContainer: React.SFC<Props> = (props) => {
  const {
    className,
    componentClass: Component,
    ...otherProps
  } = props;

  return (
    <Component {...otherProps} className={classNames(className, 'container')}/>
  );
};

LayoutContainer.defaultProps = {
  componentClass: 'div'
};

export default LayoutContainer;