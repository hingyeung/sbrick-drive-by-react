import * as React from 'react';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
import LayoutCol from '../layout/LayoutCol/LayoutCol';
import './Footer.css';

export default (props: any) => (
  <LayoutRow className="footer justify-content-end">
    <LayoutCol sm={2} className="footer__credit" componentClass={'footer'} {...props}>
      <a className="footer__credit-link" href="http://dryicons.com/free-icons/up-arrow"> Icon by Dryicons </a>
    </LayoutCol>
  </LayoutRow>
);