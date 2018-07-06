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
import { Input } from '../../Components/Form/Input';
import { InlineError } from '../../Components/Form/InlineError';

const SIDEBAR_WIDTH = '500px';
const SIDEBAR_MARGIN = '5em';

const Content = styled.div`
  max-width: calc(100% - ${SIDEBAR_WIDTH} - ${SIDEBAR_MARGIN});
`;

const MapImage = styled.img`
  max-height: 10em;
  max-width: 10em;
  display: block;
  margin: 1em auto;
`;

const Sidebar = styled.div`
  max-width: ${SIDEBAR_WIDTH};

  ${Hint} {
    text-align: left;
  }
`;

const InputContainer = styled.div`
  text-align: center;
`;

export default class ImageLevel extends Component {
  static propTypes = {
    screen: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    const [props] = args;
    this.state = {
      screen: props.screen,
      errors: { mapDescription: 'test' },
      values: { mapDescription: '' },
    };
  }

  setScreen = screen => {
    console.log('Set screen', screen);
    this.setState({ screen });
  };

  onValueChange = e => {
    const form = {
      [e.target.name]: e.target.value,
    };

    const errors = this.validateInputs(form);

    this.setState({
      errors: {
        ...this.state.errors,
        ...errors,
      },
      values: {
        ...this.state.values,
        ...form,
      },
    });
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
        <Content>
          <Narrative>
            <Markdown
              source={`Deathly spiders roam the woods. Many have taken a wrong turn and got lost in the *deep* **dark** web. ${ZEKE_NAME} needs your help to read the map.`}
            />
          </Narrative>

          {/* @todo ARIA */}
          <p className="instruction">
            <em>
              Add an <code>alt</code> attribute to the image.<br />
              Describe what it pictures{' '}
              <small>(including the word "sword")</small>
            </em>
          </p>

          <MapImage alt="Zeke's Map" src={MAP_SOURCE} />

          <InputContainer>
            <Input
              required
              pattern=".*sword.*"
              fontSize="1.5em"
              style={{ width: '100%' }}
              name="mapDescription"
              onChange={this.onValueChange}
              value={this.state.values.mapDescription}
            />
            {this.state.errors.mapDescription && (
              <InlineError>{this.state.errors.mapDescription}</InlineError>
            )}
          </InputContainer>

          <button onClick={() => this.setScreen('mapExposition')}>
            Explore the Forest
          </button>
        </Content>

        <Sidebar>
          <Markdown
            source={`Web images have the \`alt\` (alternative text) property to describe the contents of the picture. Every image should have this attribute - whether an empty string for visual effect only *or* a description that can be read aloud. Users like ${ZEKE_NAME} need this attribute to understand the context of pictures that can't be see.`}
          />

          <Hint>
            <Markdown
              source={`###### Good image descriptions:
- Briefly describe the subjects of the image.
- List numbers, figures, and relevant facts.
- Relate to the context where the image is embedded in markup.
`}
            />
          </Hint>
        </Sidebar>
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
