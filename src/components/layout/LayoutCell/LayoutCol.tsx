import * as React from 'react';
import * as classNames from 'classnames';
import { StatelessComponent } from 'react';

interface LayoutCellComponentProps {
  className?: string;
  componentClass?: any;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const isValidBootstrapColumnValue = function(value: number) {
  return value >= 1 && value <= 12;
};

const buildBootstrapGridColumnClasses = function(props: any): any {
  return {
    [`col-sm-${props.sm}`]: props.sm && isValidBootstrapColumnValue(props.sm),
    [`col-md-${props.md}`]: props.md && isValidBootstrapColumnValue(props.md),
    [`col-lg-${props.lg}`]: props.lg && isValidBootstrapColumnValue(props.lg),
    [`col-xl-${props.xl}`]: props.xl && isValidBootstrapColumnValue(props.xl)
  };
};

const LayoutCol: StatelessComponent<LayoutCellComponentProps> = (props) => {
  const {
    componentClass: Component,
    className,
    ...otherProps
  } = props;

  return (
    <Component {...otherProps} className={classNames(className, 'col', buildBootstrapGridColumnClasses(otherProps))}/>
  );
};

LayoutCol.defaultProps = {
  componentClass: 'div'
};

export default LayoutCol;