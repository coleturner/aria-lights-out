import React from 'react';

import { storiesOf } from '@storybook/react';
import { REPL } from './REPL';

storiesOf('REPL', module)
  .add('Vertical', () => (
    <REPL vertical initialSource="<center>Cool cool cool</center>" />
  ))
  .add('Horizontal', () => (
    <REPL initialSource="<center>Cool cool cool</center>" />
  ))
  .add('With Hint', () => (
    <REPL hint="Work it" initialSource="<center>Cool cool cool</center>" />
  ));
