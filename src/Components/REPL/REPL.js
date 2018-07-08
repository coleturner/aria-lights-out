import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import styled from 'react-emotion';

import { Hint } from '../Hint';
import { Input } from '../Form/Input';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FrameContainer = styled.div`
  font-family: 'Courier New', Sans-Serif;
  font-size: 16px;
  min-height: 4em;
  background: #f1f1f1;
`;

const EditorContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-content: stretch;
  border-radius: 0 0 0.25em 0.25em;

  > * {
    flex: 1;
  }
`;

const Container = styled.div`
  display: flex;
  border-radius: 0.45em;
  overflow: hidden;

  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};

  > * {
    flex: 1 0 50%;
    font-family: 'Courier New', Sans-Serif;
    font-size: 16px;

    &:only-child {
      border-radius: 0.25em;
      width: 100%;
    }

    &:not(:only-child) {
      width: 50%;

      &:first-child {
        border-radius: 0.25em 0 0 0.25em;
      }

      &:last-child {
        border-radius: 0 0.25em 0.25em 0;
      }
    }
  }

  ${FrameContainer}, ${EditorContainer} {
    min-height: 6em;
  }
`;

const Frame = styled.iframe`
  border: 0;
  flex: 1;
`;

const Editor = styled.textarea`
  background: #333;
  background: rgba(0, 0, 0, 0.35);
  color: #e8e5d8;
  border: 0;
  padding: 1em;
`;

const LineNumberSidebar = styled.pre`
  background: rgba(255, 255, 255, 0.15);
  flex: 0 1 auto;
  padding: 0.45em 0.3em;
  margin: 0;
  text-align: right;
  font-family: 'Courier New', Sans-Serif;
  font-size: 16px;
`;

function LineNumbers({ lines }) {
  const lineItems = [];

  for (let i = 1; i <= lines; i++) {
    lineItems.push(i);
  }

  return <LineNumberSidebar>{lineItems.join('\n')}</LineNumberSidebar>;
}

export class REPL extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!state || state.source === null) {
      return { source: props.initialSource };
    }

    return null;
  }

  static propTypes = {
    initialSource: PropTypes.string.isRequired,
    hint: PropTypes.string,
    lineNumbers: PropTypes.bool.isRequired,
    preview: PropTypes.bool.isRequired,
    vertical: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    initialSource: '',
    lineNumbers: true,
    preview: true,
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
    const { hint, lineNumbers, preview, vertical } = this.props;

    return (
      <Wrapper>
        <Container vertical={vertical}>
          {preview && (
            <FrameContainer>
              <Frame
                title="Preview Code"
                innerRef={this.setFrameRef}
                src="about:blank"
              />
            </FrameContainer>
          )}
          <EditorContainer>
            {lineNumbers && <LineNumbers lines={25} />}
            <Editor
              onChange={e => this.setSource(e.target.value)}
              value={this.state.source}
            />
          </EditorContainer>
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

REPL.Input = Input;
