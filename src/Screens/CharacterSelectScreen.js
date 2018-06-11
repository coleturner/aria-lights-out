import React from 'react';
import PropTypes from 'prop-types';
import { CHARACTERS } from '../constants';

/*
  @todo Abstract CharacterSelectScreen
  @body Create a new component for the options and have the main component use local state to choose a character.
*/
export default function CharacterSelectScreen({ selected, onSelect }) {
  return (
    <div className="Character-container Screen-center">
      <h2 id="character-select-title">Choose your character:</h2>
      <ul
        className="Character-choices"
        aria-labelledby="character-select-title"
        aria-activedescendant={selected && `character-${selected.name}`}
      >
        {CHARACTERS.map(character => {
          const { name, color } = character;
          const isSelected = selected && selected === character;

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
              onClick={() => onSelect(character)}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

CharacterSelectScreen.propTypes = {
  selected: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
};
