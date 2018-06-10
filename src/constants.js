import React from 'react';
import { readMaxLevel, read } from './storage';

export const AppLevel = React.createContext({ level: read('currentLevel'), maxLevel: readMaxLevel() });

export const LEVELS = ['roles', 'states', 'properties'];

export const LEVEL_NAMES = {

};

export const INCREMENT_IMPOSSIBLE_ERROR = 'A level has not yet been set';