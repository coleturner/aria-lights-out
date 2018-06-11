import React from "react";
import { AppLevel, LEVEL_NAMES } from "../constants";
import logo from "../assets/logo.svg";

export default function WelcomeScreen(props) {
  return (
    <div className="Welcome-container Screen-center">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Lights Out</h1>
      <p>
        An interactive game for learning how to create Accessible Rich Internet
        Applications (ARIA).
      </p>

      <ol className="Welcome-actions" role="menubar">
        <AppLevel.Consumer>
          {/* TODO: support continuing any level from welcome screen */}
          {({ maxLevel }) =>
            !!maxLevel && (
              <li>
                <button>Continue: {LEVEL_NAMES[maxLevel]}</button>
              </li>
            )
          }
        </AppLevel.Consumer>
        <AppLevel.Consumer>
          {({ incrementLevel }) => (
            <li>
              <button onClick={() => incrementLevel()}>New Game</button>
            </li>
          )}
        </AppLevel.Consumer>
      </ol>
    </div>
  );
}
