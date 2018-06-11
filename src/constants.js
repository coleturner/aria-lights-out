import React from 'react';
import { readMaxLevel, read } from './storage';

export const AppLevel = React.createContext({
  level: read('currentLevel'),
  maxLevel: readMaxLevel(),
});

export const LEVELS = ['roles', 'states', 'properties'];

export const LEVEL_NAMES = {
  '1': 'Character',
};

export const CHARACTERS = [
  { name: 'Zeke', color: 'rgb(255, 146, 146)' },
  { name: 'Robin', color: 'rgb(146, 224, 255)' },
  { name: 'Jade', color: 'rgb(159, 255, 146)' },
];

export const INCREMENT_IMPOSSIBLE_ERROR = 'A level has not yet been set';
