import * as React from 'react';
import DriveByReact from './components/DriveByReact/DriveByReact';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './App.css';
import LayoutContainer from './components/layout/LayoutContainer/LayoutContainer';
import LayoutRow from './components/layout/LayoutRow/LayoutRow';
import Header from './components/Header/Header';
import LayoutCol from './components/layout/LayoutCell/LayoutCol';
import Footer from './components/Footer/Footer';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <LayoutContainer extraClassNames="app-container">
        <LayoutRow>
          <Header/>
        </LayoutRow>
        <LayoutRow>
          <DriveByReact/>
        </LayoutRow>
        <LayoutCol componentClass={Footer}/>
      </LayoutContainer>
    );
  }
}
