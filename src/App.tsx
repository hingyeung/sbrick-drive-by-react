import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import * as React from 'react';
import DriveByReact from './components/DriveByReact/DriveByReact';
import './App.css';
import LayoutContainer from './components/layout/LayoutContainer/LayoutContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <LayoutContainer className="app-container">
        <Header/>
        <DriveByReact/>
        <Footer/>
      </LayoutContainer>
    );
  }
}
