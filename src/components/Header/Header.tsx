import * as React from 'react';
import LayoutCol from '../layout/LayoutCol/LayoutCol';
import './header.css';
import LayoutRow from '../layout/LayoutRow/LayoutRow';

export default () => {
  return (
    <LayoutRow>
      <LayoutCol sm={4} className="header__column header__logo">
        SBrick Drive by React
      </LayoutCol>
      <LayoutCol sm={8} className="header__column header__menu-bar">
        &nbsp;
      </LayoutCol>
    </LayoutRow>
  );
};