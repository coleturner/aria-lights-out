import styled from 'react-emotion';

const THIN_OUTLINE_TYPES = ['file', 'radio', 'checkbox'];

const getBackgroundProps = ({ disabled, readOnly }) => {
  if (disabled) {
    return 'background-color: #eaeded;';
  } else if (readOnly) {
    return 'background-color: #eee;';
  }

  return null;
};

const getBorderColorProps = ({ disabled, readOnly }) => {
  if (readOnly) {
    return 'border: 1px solid #eee;';
  }

  return 'border: 1px solid #ccc;';
};

const getColorProps = ({ disabled, readOnly }) => {
  if (disabled) {
    return 'color: #cad2d3;';
  } else if (readOnly) {
    return 'color: #777;';
  }

  return null;
};

const getPaddingProps = ({ type }) => {
  if (type === 'color') {
    return 'padding: 0.2em 0.5em;';
  }

  return 'padding: 0.5em 0.6em;';
};

export const Input = styled.input`
  display: inline-block;
  box-shadow: inset 0 1px 3px #ddd;
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: ${({ fontSize }) => fontSize};

  /* prettier-ignore-start */
  ${getBackgroundProps}
  ${getBorderColorProps}
  ${getColorProps}
  ${getPaddingProps}
  /* prettier-ignore-end */

  /* disabled rules */
  ${({ disabled }) =>
    disabled ? 'cursor: not-allowed;' : ''} /* end disabled rules */

  &:invalid,
  &.invalid {
    color: #e9322d;
  }

  &:focus,
  &.focus {
    outline: ${({ type }) =>
      THIN_OUTLINE_TYPES.includes(type.toLowerCase())
        ? 'thin solid #129FEA'
        : '0'};

    ${({ type }) =>
      THIN_OUTLINE_TYPES.includes(type.toLowerCase())
        ? 'outline: 1px auto #129FEA'
        : ''} border-color: #129fea;

    &:invalid {
        border-color: #e9322d;
        
        ${({ type }) =>
          THIN_OUTLINE_TYPES.includes(type) ? 'outline-color: #e9322d;' : ''}
    }
  }
`;

Input.defaultProps = {
  fontSize: '1em',
  borderRadius: '4px',
  type: 'text',
};
