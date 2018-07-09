import React from 'react';
import styled from 'react-emotion';
import { ScreenCenterWrapper } from '../Components/ScreenCenterWrapper';

const ErrorContainer = styled.div`
  padding: 3em;

  h2 {
    font-size: 2em;
  }
`;

const ErrorScreen = () => (
  <ScreenCenterWrapper>
    <ErrorContainer>
      <h2>Uh oh!</h2>
      <p>
        Something went wrong - this is a dead end. To continue, try refreshing
        the page.
      </p>
    </ErrorContainer>
  </ScreenCenterWrapper>
);

export default ErrorScreen;
