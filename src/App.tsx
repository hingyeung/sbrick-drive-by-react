import * as React from 'react';
import DriveByReact from './components/DriveByReact/DriveByReact';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './App.css';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app-container">
        <DriveByReact/>
      </div>
    );
  }
}
