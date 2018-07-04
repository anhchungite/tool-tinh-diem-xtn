import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className="container">
          <Form/>
          <Result/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
