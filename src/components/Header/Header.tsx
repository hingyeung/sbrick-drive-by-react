import * as React from 'react';
import LayoutCol from '../layout/LayoutCol/LayoutCol';
import './header.css';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
// @ts-ignore
import SBrickLogo from '../../assets/sbrick_logo_400x400.png';

export default () => {
  return (
    <LayoutRow className="header align-items-center">
      <LayoutCol sm={4} className="header__logo">
        <img className="header__logo-img" src={SBrickLogo}/> <span className="header__logo--dim">drive</span>SBrick
      </LayoutCol>
      <LayoutCol sm={8} className="header__menu-bar">
        Drive SBrick by React
      </LayoutCol>
    </LayoutRow>
  );
};