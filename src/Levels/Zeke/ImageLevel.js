import React, { Component } from 'react';
import { DRAGON_NAME, ZEKE_NAME, ARMOR_NAME } from '../../constants';

export default class ImageLevel extends Component {
  state = { screen: null };

  renderExposition() {
    return (
      <>
        <p>
          The prophecy states that {DRAGON_NAME} spits a venom so acidic that it
          turns bone into soup. For {ZEKE_NAME} to slay, first we must find the
          sacred ${ARMOR_NAME}.
        </p>
        <p>
          But time has not been kind to {ZEKE_NAME}'s eyes. While his eyes can
          no longer see, the rest of his senses have adapted. To find the armor
          you must assist {ZEKE_NAME} in seeking the sacred armor.
        </p>
      </>
    );
  }

  render() {
    switch (this.state.screen) {
      default:
        return this.renderExposition();
    }
  }
}
