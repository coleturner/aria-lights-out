import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import styled, { css } from 'react-emotion';
import {
  DRAGON_NAME,
  ZEKE_NAME,
  ARMOR_NAME,
  MAP_DESCRIPTION,
} from '../../constants';
import MAP_SOURCE from '../../assets/map.svg';
import { Flexbox } from '../../Components/Flexbox';
import { Narrative } from '../../Components/Narrative';
import { Hint } from '../../Components/Hint';

const Preview = styled('div')`
  text-align: center;

  img {
    max-height: 20em;
    max-width: 20em;
  }

  ${Hint} {
    text-align: left;
  }
`;
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
      <Flexbox className="Screen-full">
        <div>
          <Narrative>
            <Markdown
              source={`Deathly spiders roam the woods. One wrong turn and
${ZEKE_NAME} ends in the *deep* **dark** web.`}
            />
          </Narrative>

          <Markdown
            source={`Web images have the \`alt\` (alternative text) property to describe the contents of the picture. Every image should have this attribute - whether an empty string for visual effect only *or* a description that can be read aloud. ${ZEKE_NAME} needs this attribute to understand pictures he can't see.`}
          />

          {/* @todo ARIA */}
          <p className="instruction">
            <em>
              Add an <code>alt</code> attribute to the image.
            </em>
          </p>

          <button onClick={() => this.setScreen('mapExposition')}>
            Explore the Forest
          </button>
        </div>

        <Preview>
          <img alt="Zeke's Map" src={MAP_SOURCE} />
          <Hint>
            <Markdown
              source={`###### Good image descriptions:
- Briefly describe the subjects of the image.
- List numbers, figures, and relevant facts.
- Relate to the context where the image is embedded in markup.
`}
            />
          </Hint>
        </Preview>
      </Flexbox>
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
    return <main>{this.renderScreen()}</main>;
  }
}
