import React, { Component } from 'react';
import { CHARACTERS, AppContext } from '../constants';

/*
  @todo Abstract CharacterSelectScreen
  @body Create a new component for the options and have the main component use local state to choose a character.
*/

export default class CharacterSelectScreen extends Component {
  state = { selected: null };

  characterStateFactory = character => state => ({ selected: character });
  onSelect = character => this.setState(this.characterStateFactory(character));

  onSubmit = ({ setGameState, incrementLevel }) => {
    if (!this.state.selected) {
      throw new Error('No character is selected');
    }

    setGameState({
      characterName: this.state.selected.name,
    });
    console.log('what');
    incrementLevel();
  };

  render() {
    const { selected } = this.state;
    console.log('selected', selected);

    return (
      <div className="Character-container Screen-center">
        <h2 id="character-select-title">Choose your character:</h2>
        <ul
          className="Character-choices"
          aria-labelledby="character-select-title"
          aria-activedescendant={selected && `character-${selected.name}`}
        >
          {CHARACTERS.map(character => {
            const { avatar, name, color } = character;
            const isSelected = selected && selected === character;

            const avatarPath = require(`../assets/${avatar}`);

            return (
              <li
                key={name}
                aria-checked={isSelected}
                role="radio"
                id={`character-${name}`}
                style={{
                  borderColor: isSelected && color,
                  color,
                }}
                onClick={() => this.onSelect(character)}
              >
                <img src={avatarPath} alt={`Avatar for ${name}`} />
                {name}
              </li>
            );
          })}
        </ul>

        <AppContext.Consumer>
          {app => (
            <button
              disabled={!selected}
              className="Continue-button"
              onClick={() => (selected ? this.onSubmit(app) : null)}
            >
              Start Adventure
            </button>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}
