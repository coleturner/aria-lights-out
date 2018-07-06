import styled from 'react-emotion';

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  > * {
    flex: ${({ flex }) => flex};
    ${({ itemStyle }) => itemStyle};
  }
`;

Flexbox.defaultProps = {
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  flex: '1',
  justifyContent: 'space-between',
};
