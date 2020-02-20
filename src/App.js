import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import Header from './components/Header';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from'react-addons-css-transition-group';
class App extends Component {
  render() {
    let fail = false;
    if(this.props.result && (this.props.result <= 5 || this.props.sateless.length > 0)) {
      fail = true;
    }
    return (
      <React.Fragment>
        <div className={fail ? 'bg-image' : ''}></div>
        <div className={fail ? 'wrap' : ''}>
        <Header/>
        <div className="container">
          <Form/>
          <ReactCSSTransitionGroup transitionName = "result" component="div"
               transitionEnterTimeout = {500} transitionLeaveTimeout = {500}>
          {this.props.result > 0 ? <Result/> : ''}
          </ReactCSSTransitionGroup>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    result: state.result,
    sateless: state.sateless
  }
}
export default connect(mapStateToProp)(App);
