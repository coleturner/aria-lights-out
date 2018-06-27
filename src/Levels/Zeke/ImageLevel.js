import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import REPL from '../../REPL';
import {
  DRAGON_NAME,
  ZEKE_NAME,
  ARMOR_NAME,
  MAP_DESCRIPTION,
} from '../../constants';
import MAP_SOURCE from '../../assets/map.svg';
export default class ImageLevel extends Component {
  static propTypes = {
    screen: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    const [props] = args;
    this.state = { screen: props.screen };
  }

  setScreen = screen => {
    console.log('Set screen', screen);
    this.setState({ screen });
  };

  renderIntroduction() {
    return (
      <React.Fragment>
        <Markdown
          source={`The prophecy states that ${DRAGON_NAME} spits a venom so acidic it melts bone to soup. To survive ${ZEKE_NAME} must find the sacred ${ARMOR_NAME}.

But he can't see. ${ZEKE_NAME} is blind and you will lead the way to the sacred armor. Here is your map:`}
        />
        <img src={MAP_SOURCE} alt={MAP_DESCRIPTION} />
        {/* @todo ARIA */}
        <button onClick={() => this.setScreen('mapExposition')}>
          Find the Armor
        </button>
      </React.Fragment>
    );
  }

  renderMapExposition() {
    return (
      <React.Fragment>
        <Markdown
          source={`The woods outside have deathly spiders. One wrong turn and
${ZEKE_NAME} ends in the deep dark web. To help him read the map, we will need to make the image accessible.

Web images have the \`alt\` (alternative text) property to describe the contents of the picture. Every image should have this attribute - whether an empty string for visual effect only *or* a description that can be read aloud. ${ZEKE_NAME} needs this attribute to understand pictures he can't see.`}
        />

        <REPL
          vertical
          initialSource={`<img src="${MAP_SOURCE}" />`}
          styleSheet={`
            img {
              max-height: 5em;
              max-width: 5em;
            }
          `}
        />

        <Markdown
          source={`Good image descriptions:
- Briefly describe the subjects of the image.
- List numbers, figures, and relevant facts.
- Relate to the context where the image is embedded in markup.
`}
        />
        {/* @todo ARIA */}
        <p className="instruction">
          <em>Add an alt attribute that tells Zeke where to go.</em>
        </p>
        <button onClick={() => this.setScreen('mapExposition')}>
          Explore the Forest
        </button>
      </React.Fragment>
    );
  }

  renderScreen() {
    switch (this.state.screen) {
      case 'mapExposition':
        return this.renderMapExposition();
      default:
        return this.renderIntroduction();
    }
  }

  render() {
    return <main className="Screen-left">{this.renderScreen()}</main>;
  }
}
