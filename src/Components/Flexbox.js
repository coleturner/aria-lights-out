import styled from 'react-emotion';

export const Flexbox = styled('div')`
  display: flex;
  flex-direction: row;

  > * {
    flex: 1;
  }
`;
