import * as React from 'react';
import * as classNames from 'classnames';

interface LayoutColComponentProps {
  // className?: string;
  componentClass?: any;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  propsForComponent?: object;
}

const isValidBootstrapColumnValue = function (value: number) {
  return value >= 1 && value <= 12;
};

const buildBootstrapGridColumnClasses = function (props: any): any {
  return {
    [`col-sm-${props.sm}`]: props.sm && isValidBootstrapColumnValue(props.sm),
    [`col-md-${props.md}`]: props.md && isValidBootstrapColumnValue(props.md),
    [`col-lg-${props.lg}`]: props.lg && isValidBootstrapColumnValue(props.lg),
    [`col-xl-${props.xl}`]: props.xl && isValidBootstrapColumnValue(props.xl)
  };
};

const LayoutCol: React.SFC<LayoutColComponentProps &
  React.HTMLAttributes<HTMLDivElement> &
  React.ClassAttributes<HTMLDivElement>> = (props) => {
  const {
    componentClass: Component,
    className,
    propsForComponent,
    ...otherProps,
  } = props;

  return (
    <Component
      {...propsForComponent}
      className={classNames(className, 'col', buildBootstrapGridColumnClasses(otherProps))}
      {...otherProps}
    />
  );
};

LayoutCol.defaultProps = {
  componentClass: 'div'
};

export default LayoutCol;