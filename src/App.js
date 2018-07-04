import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import Header from './components/Header';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from'react-addons-css-transition-group';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className="container">
          <Form/>
          <ReactCSSTransitionGroup transitionName = "result" component="div"
               transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
          {this.props.result > 0 ? <Result/> : ''}
          </ReactCSSTransitionGroup>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    result: state.result
  }
}
export default connect(mapStateToProp)(App);
