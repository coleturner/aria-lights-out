import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import { InlineError } from './InlineError';

storiesOf('Form', module)
  .add('Text Input', () => {
    const states = [
      { __name: 'Default State' },
      { __name: 'Disabled', disabled: true },
      { __name: 'Focused', className: 'focus' },
      { __name: 'Invalid', className: 'invalid' },
    ];
    return (
      <div style={{ padding: '1em' }}>
        {states.map(({ __name, ...props }) => {
          !!!__name && console.error('Missing __name for', props);
          return (
            <p key={__name}>
              <h3>{__name}</h3>
              <Input {...props} value="The quick brown fox..." />
            </p>
          );
        })}
      </div>
    );
  })
  .add('Inline Error', () => (
    <div style={{ padding: '1em' }}>
      <InlineError>How dare you</InlineError>
    </div>
  ));
