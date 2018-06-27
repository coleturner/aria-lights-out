import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '@storybook/react/demo';
import ImageLevel from './ImageLevel';

storiesOf('Zeke/Image Level', module)
  .add('Introduction', () => <ImageLevel screen={null} />)
  .add('Map Exposition', () => <ImageLevel screen="mapExposition" />);
