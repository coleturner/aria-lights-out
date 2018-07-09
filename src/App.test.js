import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from './App';
import { INCREMENT_IMPOSSIBLE_ERROR } from './constants';

describe('App', () => {
  it('renders without crashing', () => {
    const tree = TestRenderer.create(<App />).toTree();

    expect(tree.nodeType).toBe('component');
    expect(tree.type.prototype.constructor.name).toBe('App');
  });

  describe('#incrementLevel', () => {
    const makeComponent = (props) => TestRenderer.create(<App {...props} />);

    it('increments from 0 to 1', () => {
      const component = makeComponent({ level: 0, maxLevel: 0 });
      const instance = component.getInstance();

      instance.incrementLevel();

      expect(instance.state.level).toBe(1);
      expect(instance.state.maxLevel).toBe(1);
    });

    it('throws an error if level is not a number', () => {
      const component = makeComponent({ level: null });
      const instance = component.getInstance();

      expect(() => {
        instance.incrementLevel();
      }).toThrowError(INCREMENT_IMPOSSIBLE_ERROR);
    });
  })
});
