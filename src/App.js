import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterSelectScreen from './Screens/CharacterSelectScreen';
import ErrorScreen from './Screens/ErrorScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import { AppContext, LEVELS, INCREMENT_IMPOSSIBLE_ERROR } from './constants';
import {
  readCurrentLevel,
  readGameState,
  readMaxLevel,
  write,
  writeGameState,
} from './storage';

import './App.css';
import './Forms.css';
import { stateReducer } from './Game';

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
    const {
      level = initialLevel,
      maxLevel = readMaxLevel(),
      gameState = readGameState(),
    } = props;

    this.state = { level, maxLevel, gameState };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level !== this.props.level) {
      this.setLevel(nextProps.level);
    }
  }

  incrementLevel = () => {
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
  };

  setLevel = level => {
    console.log('Setting level to', level);
    const maxLevel = isNaN(this.state.maxLevel)
      ? level
      : Math.max(this.state.maxLevel, level);
    this.setState({ level });

    if (maxLevel !== this.state.maxLevel) {
      this.setMaxLevel(maxLevel);
    }
  };

  setMaxLevel = maxLevel => {
    write('maxLevel', maxLevel);
    this.setState({ maxLevel });
  };

  renderLevel = () => {
    if (levelComponents.hasOwnProperty(this.state.level)) {
      const Level = levelComponents[this.state.level];

      return <Level />;
    }

    return <ErrorScreen />;
  };

  gameStateSetterFactory = gameState => state => ({
    gameState: stateReducer({ ...state.gameState, ...gameState }),
  });

  setGameState = gameState => {
    this.setState(this.gameStateSetterFactory(gameState));
    writeGameState(gameState);
  };

  getAppContextContext = () => {
    return {
      incrementLevel: this.incrementLevel,
      level: this.state.level,
      maxLevel: this.state.maxLevel,
      gameState: this.state.gameState,
      setGameState: this.setGameState,
    };
  };

  render() {
    return (
      <AppContext.Provider value={this.getAppContextContext()}>
        {this.renderLevel()}
      </AppContext.Provider>
    );
  }
}

export default App;
