import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './REPL.css';

class REPL extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!state || state.source === null) {
      return { source: props.initialSource };
    }

    return null;
  }

  static propTypes = {
    initialSource: PropTypes.string.isRequired,
  };

  static defaultProps = {
    initialSource: '',
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
      body { padding: 1em; }

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
    return (
      <div className="repl">
        <iframe title="Preview Code" ref={this.setFrameRef} src="about:blank" />
        <textarea
          onChange={e => this.setSource(e.target.value)}
          value={this.state.source}
        />
      </div>
    );
  }
}

export default REPL;
