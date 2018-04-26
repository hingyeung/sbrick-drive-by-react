import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';
import * as classNames from 'classnames';
import './Button.css';

// const buildIconDOM = (icon: any): JSX.Element => {
//   if (icon) {
//     return (
//       <img src={icon}/>
//     );
//   }
//   return <span/>;
// };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconClasses?: string;
}

const Button: React.SFC<ButtonProps> = (props) => {
  const {
    className,
    iconClasses,
    children,
    ...otherProps,
  } = props;

  const mergedClasses = classNames('btn', className);
  const mergedIconClasses = iconClasses ? classNames(['btn__icon', iconClasses]) : '';

  return (
    <button {...otherProps} className={mergedClasses}>
      <i className={mergedIconClasses} /> {children}
    </button>
  );
};

export default Button;