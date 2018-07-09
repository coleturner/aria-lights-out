import React from 'react';
import logo from '../assets/logo.svg';
import styled from 'react-emotion';
import { AppContext, LEVEL_NAMES } from '../constants';
import { ScreenCenterWrapper } from '../Components/ScreenCenterWrapper';

const WelcomeContainer = styled.div`
  padding: 3em;

  p {
    font-size: 1.3em;
  }
`;

const WelcomeLogo = styled.img`
  height: 80px;
`;

const WelcomeActions = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    font-size: 1.15em;
    letter-spacing: 0.06em;
    margin: 0.15em 0.3em;
  }
`;

const WelcomeScreen = props => (
  <ScreenCenterWrapper>
    <WelcomeContainer>
      <WelcomeLogo src={logo} alt="logo" />
      <h1>Lights Out</h1>
      <p>
        An interactive game for learning how to create Accessible Rich Internet
        Applications (ARIA).
      </p>

      <WelcomeActions role="menubar">
        <AppContext.Consumer>
          {/* TODO: support continuing any level from welcome screen */}
          {({ maxLevel }) =>
            !!maxLevel && (
              <li>
                <button>Continue: {LEVEL_NAMES[maxLevel]}</button>
              </li>
            )
          }
        </AppContext.Consumer>
        <AppContext.Consumer>
          {({ incrementLevel }) => (
            <li>
              <button onClick={() => incrementLevel()}>New Game</button>
            </li>
          )}
        </AppContext.Consumer>
      </WelcomeActions>
    </WelcomeContainer>
  </ScreenCenterWrapper>
);

export default WelcomeScreen;
