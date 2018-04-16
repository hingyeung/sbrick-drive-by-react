import * as React from 'react';
import * as classNames from 'classnames';

export interface Props {
  extraClassNames: string;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: any;
}

function isValidBootstrapColumnValue(value: number) {
  return value >= 1 && value <= 12;
}

function buildBootstrapGridColumnClasses(props: Props): any {
  return {
    [`col-sm-${props.sm}`]: props.sm && isValidBootstrapColumnValue(props.sm),
    [`col-md-${props.md}`]: props.md && isValidBootstrapColumnValue(props.md),
    [`col-lg-${props.lg}`]: props.lg && isValidBootstrapColumnValue(props.lg),
    [`col-xl-${props.xl}`]: props.xl && isValidBootstrapColumnValue(props.xl)
  };
}

const LayoutCell: React.SFC<Props> = (props: Props) => {
  return (
    <div className={classNames(props.extraClassNames, buildBootstrapGridColumnClasses(props))}>
      {props.children}
    </div>
  );
};

export default LayoutCell;