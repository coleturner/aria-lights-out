import React from 'react';

export const AppContext = React.createContext({
  level: null,
  maxLevel: null,
  gameState: null,
  setGameState: () => {},
});

export const LEVELS = ['roles', 'states', 'properties'];

export const LEVEL_NAMES = {
  '1': 'Character',
};

export const CHARACTERS = [
  { avatar: 'zeke.svg', name: 'Zeke', color: 'rgb(255, 146, 146)' },
  { avatar: 'robin.svg', name: 'Robin', color: 'rgb(146, 224, 255)' },
  { avatar: 'jade.svg', name: 'Jade', color: 'rgb(159, 255, 146)' },
];

export const INCREMENT_IMPOSSIBLE_ERROR = 'A level has not yet been set';
