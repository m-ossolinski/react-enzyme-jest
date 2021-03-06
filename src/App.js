import React, { Component } from 'react';
import logo from './logo.svg';
import Form from './Form.js';
import TodoList from './TodoList';
import './App.css';


class App extends Component {
  state = {
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: '',
  }

  handleStrings(str) {
    if (str === 'Hello world') return true
    return false;
  }

  componentDidMount() {
    this.setState({ lifeCycle: 'componentDidMount' })
  }

  componentWillReceiveProps() {
    this.setState({ lifeCycle: 'componentWillReceiveProps' })
  }

  render() {
    return (
      <div className="App">
        <Form />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className='button-state'>{this.state.on ? 'Yes!' : 'No!'}</p>
        <button onClick={() => this.setState({ on: true })}>Click</button>
        <h2>{this.state.input}</h2>
        <input onChange={(e) => this.setState({ input: e.target.value })} type="text" />
        <h3 className={this.state.mainColor}>Red blue color</h3>
        <p className="lifecycle1">{this.state.lifeCycle}</p>
        <p className="lifecycle">{this.state.lifeCycle}</p>
      </div>
    );
  }
}

export class Link extends Component {
  render() {
    return this.props.hide ? null : <a href={this.props.address}>Click</a>
  }
}

export default App;
