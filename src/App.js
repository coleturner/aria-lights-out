import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorScreen from './Screens/ErrorScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import { AppLevel, LEVELS, INCREMENT_IMPOSSIBLE_ERROR } from './constants';
import { readMaxLevel, write } from './storage';
import './App.css';

const levelComponents = {
  welcome: WelcomeScreen
}

class App extends Component {
  static propTypes = {
    level: PropTypes.number
  }

  constructor(...args) {
    super(...args);

    const [props] = args;
    const { level, maxLevel = readMaxLevel() } = props;
    this.state = { level };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.level !== this.props.level) {
      this.setLevel(nextProps.level);
    }
  }

  incrementLevel() {
    if (typeof this.state.level !== 'number') {
      throw new Error(INCREMENT_IMPOSSIBLE_ERROR);
    }

    const nextLevel = this.state.level + 1;
    this.setLevel(nextLevel);
  }

  setLevel(level) {
    const maxLevel = isNaN(this.state.maxLevel) ?
      level : Math.max(this.state.maxLevel, level);
    this.setState({ level });

    if (maxLevel !== this.state.maxLevel) {
      this.setMaxLevel(maxLevel);
    }
  }

  setMaxLevel(maxLevel) {
    write('maxLevel', maxLevel);
    this.setState({ maxLevel });
  }

  renderLevel() {
    if (levelComponents.hasOwnProperty(this.state.level)) {
      const Level = this.levelComponents[this.state.level];

      return this.state.level;
    }

    return <ErrorScreen />
  }

  render() {
    return (
      <AppLevel.Provider value={{ level: this.state.level, maxLevel: this.state.maxLevel }}>
        {this.renderLevel()}
      </AppLevel.Provider>
    );
  }
}

export default App;
