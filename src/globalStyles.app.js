import { injectGlobal } from 'emotion';

injectGlobal`
  :root {
    --text-primary-color: #fffdf0;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background: #252a2f;
    color: #dfded0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.5;
    font-family: Frutiger, 'Frutiger Linotype', Univers, Calibri, 'Gill Sans',
      'Gill Sans MT', 'Myriad Pro', Myriad, 'DejaVu Sans Condensed',
      'Liberation Sans', 'Nimbus Sans L', Tahoma, Geneva, 'Helvetica Neue',
      Helvetica, Arial, sans-serif;
    font-size: 16px;
  }

  ol,
  ul {
    padding-left: 1.45em;
    margin: 0 0 0.75em;
  }

  button {
    border-radius: 0.15em;
    background: transparent;
    text-transform: uppercase;
    color: var(--text-primary-color);
    border: 2px solid var(--text-primary-color);
    padding: 0.65em 1.45em;
    font-weight: 400;
    cursor: pointer;
  }

  button:hover {
    background: var(--text-primary-color);
    color: #333;
  }

  button:active {
    background: #ffffdf;
    border-color: #ffffdf;
    color: #333;
  }

  button:focus {
    background: #ffffdf70;
    border-color: transparent;
    color: rgba(0, 0, 0, 0.3);
  }

  button:disabled,
  button[disabled] {
    background: rgba(100, 100, 100, 0.75);
    border-color: transparent;
    color: rgba(255, 255, 255, 0.35);
    cursor: not-allowed;
  }

  .Screen-full {
    padding: 0 1em;
  }

  .Screen-left {
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
  }

  .instruction {
    font-size: 1.75em;
    color: #fff;
    text-align: center;
    color: #a3f5c5;
    border: 4px dashed rgba(255, 255, 255, 0.35);
    border-left: 0;
    border-right: 0;
    padding: 0.45em 0.3em;
  }

  code {
    display: inline-block;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.3em;
    padding: 0.15em 0.3em;
    margin-top: -0.15em;
  }
`;
