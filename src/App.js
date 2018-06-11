import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterSelectScreen from './Screens/CharacterSelectScreen';
import ErrorScreen from './Screens/ErrorScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import { AppLevel, LEVELS, INCREMENT_IMPOSSIBLE_ERROR } from './constants';
import { readCurrentLevel, readMaxLevel, write } from './storage';

import './App.css';
import './Forms.css';

const levelComponents = {
  welcome: WelcomeScreen,
  1: CharacterSelectScreen,
};

class App extends Component {
  static propTypes = {
    level: PropTypes.number,
  };

  constructor(...args) {
    super(...args);

    const [props] = args;
    const initialLevel = readCurrentLevel() || 'welcome';
    const { level = initialLevel, maxLevel = readMaxLevel() } = props;
    this.state = { level, maxLevel };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level !== this.props.level) {
      this.setLevel(nextProps.level);
    }
  }

  incrementLevel() {
    console.log(this);
    if (this.state.level === 'welcome') {
      // Shhh it's ok this is on purpose
      // eslint-disable-next-line
      this.state.level = 0;
    }

    if (typeof this.state.level !== 'number') {
      throw new Error(INCREMENT_IMPOSSIBLE_ERROR);
    }

    const nextLevel = this.state.level + 1;
    this.setLevel(nextLevel);
  }

  setLevel(level) {
    console.log('Setting level to', level);
    const maxLevel = isNaN(this.state.maxLevel)
      ? level
      : Math.max(this.state.maxLevel, level);
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
      const Level = levelComponents[this.state.level];

      return <Level />;
    }

    return <ErrorScreen />;
  }

  getAppLevelContext() {
    return {
      incrementLevel: this.incrementLevel.bind(this),
      level: this.state.level,
      maxLevel: this.state.maxLevel,
    };
  }

  render() {
    return (
      <AppLevel.Provider value={this.getAppLevelContext()}>
        {this.renderLevel()}
      </AppLevel.Provider>
    );
  }
}

export default App;
