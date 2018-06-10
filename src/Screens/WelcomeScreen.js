import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppLevel, LEVEL_NAMES } from '../constants';
import logo from '../assets/logo.svg';

export default function WelcomeScreen(props) {
    return (
        <div className='Welcome-container'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Lights Out</h1>
            <p>An interactive game for learning how to create Accessible Rich Internet Applications (ARIA).</p>

            <ol class='Welcome-actions'>
                <AppLevel.Consumer>
                    {/* TODO: support continuing any level from welcome screen */}
                    {({ maxLevel }) => maxLevel && (
                        <button>Continue: {LEVEL_NAMES[maxLevel]}</button>
                    )}
                </AppLevel.Consumer>
                <button>New Game</button>
            </ol>
        </div>
    );
}