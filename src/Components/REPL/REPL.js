import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import styled from 'react-emotion';

import { Hint } from '../Hint';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  border-radius: 0.45em;
  overflow: hidden;

  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
`;

const paneStyle = `
flex: 1 0 50%;
font-family: 'Courier New', Sans-Serif;
font-size: 16px;
`;

const FrameContainer = styled.div`
  ${paneStyle} font-family: 'Courier New', Sans-Serif;
  font-size: 16px;
  min-height: 4em;
  background: #f1f1f1;
  border-radius: ${({ vertical }) =>
    vertical ? '0.25em 0.25em 0 0' : '0.25em 0 0 0.25em'};
  width: ${({ vertical }) => (vertical ? '100%' : '50%')};
`;

const Frame = styled.iframe`
  border: 0;
  flex: 1;
`;

const Editor = styled.textarea`
  ${paneStyle};

  background: #333;
  background: rgba(0, 0, 0, 0.35);
  color: #e8e5d8;
  border-radius: 0 0 0.25em 0.25em;
  border: 0;
  padding: 1em;
`;

export class REPL extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!state || state.source === null) {
      return { source: props.initialSource };
    }

    return null;
  }

  static propTypes = {
    initialSource: PropTypes.string.isRequired,
    vertical: PropTypes.bool.isRequired,
    hint: PropTypes.string,
  };

  static defaultProps = {
    initialSource: '',
    vertical: false,
  };

  setSource = source => {
    this.setState({ source }, () => this.updateContent(source));
  };

  setFrameRef = ref => {
    this.frameRef = ref;
    this.writeFrame();
  };

  getFrameTemplate() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Preview Source</title>
    <style type="text/css">
      * { border-box: context-box; padding: 0; margin: 0; }
      body {
        padding: 1em;
        line-height: 1.5;
        font-family: Frutiger, 'Frutiger Linotype', Univers, Calibri, 'Gill Sans',
          'Gill Sans MT', 'Myriad Pro', Myriad, 'DejaVu Sans Condensed',
          'Liberation Sans', 'Nimbus Sans L', Tahoma, Geneva, 'Helvetica Neue',
          Helvetica, Arial, sans-serif;
        text-align: center;
      }

      ${this.props.styleSheet}
    </script>
</head>
<body></body>
</html>
`;
  }

  writeFrame = () => {
    if (!this.frameRef) {
      return;
    }

    this.frameRef.contentDocument.open();
    this.frameRef.contentDocument.write(this.getFrameTemplate());
    this.frameRef.contentDocument.close();
    this.updateContent(this.state.source);
  };

  updateContent(source) {
    this.frameRef.contentDocument.body.innerHTML = source;
  }

  render() {
    const { hint, vertical } = this.props;

    return (
      <Wrapper>
        <Container vertical={vertical}>
          <FrameContainer vertical={vertical}>
            <Frame
              title="Preview Code"
              innerRef={this.setFrameRef}
              src="about:blank"
            />
          </FrameContainer>
          <Editor
            onChange={e => this.setSource(e.target.value)}
            value={this.state.source}
          />
        </Container>

        {hint && (
          <Hint>
            <Markdown source={hint} />
          </Hint>
        )}
      </Wrapper>
    );
  }
}
