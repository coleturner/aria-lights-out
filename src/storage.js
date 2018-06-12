import { stateReducer } from './Game';

export function read(key) {
  return localStorage.getItem(key);
}

export function write(key, value) {
  return localStorage.setItem(key, value);
}

export function readMaxLevel() {
  return parseInt(read('maxLevel'), 10);
}

export function readCurrentLevel() {
  return parseInt(read('currentLevel'), 10);
}

export function readGameState() {
  try {
    return stateReducer(JSON.parse(read('gameState'))) || {};
  } catch (e) {
    return {};
  }
}

export function writeGameState(state) {
  return write('gameState', JSON.stringify(stateReducer(state)));
}
