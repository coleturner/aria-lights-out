import React, { Component } from 'react';
import styled from 'react-emotion';
import { CHARACTERS, AppContext } from '../constants';
import { ScreenCenterWrapper } from '../Components/ScreenCenterWrapper';

const CharacterContainer = styled.div`
  fieldset {
    font-size: 1.5em;
  }
`;

const CharacterChoices = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const CharacterChoicesItem = styled.li`
  flex: 1;
  max-width: 30%;
  max-width: calc((100% / 3) - 1em);
  margin: 1em;
  font-size: 1.3em;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.3em;
  padding: 0.65em;
  cursor: pointer;
  outline: none;
  user-select: none;

  &:hover {
    border-color: #fff;
  }
`;

const CharacterChoicesItemAvatar = styled.img`
  max-height: 3em;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.3em;
`;

const ContinueButton = styled.button`
  margin-top: 0.7em 5em;
  font-size: 1.15em;
`;

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
      <ScreenCenterWrapper>
        <CharacterContainer>
          <h2 id="character-select-title">Choose your character:</h2>
          <CharacterChoices
            aria-labelledby="character-select-title"
            aria-activedescendant={selected && `character-${selected.name}`}
          >
            {CHARACTERS.map(character => {
              const { avatar, name, color } = character;
              const isSelected = selected && selected === character;
              const avatarPath = require(`../assets/${avatar}`);

              return (
                <CharacterChoicesItem
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
                  <CharacterChoicesItemAvatar
                    src={avatarPath}
                    alt={`Avatar for ${name}`}
                  />
                  {name}
                </CharacterChoicesItem>
              );
            })}
          </CharacterChoices>

          <AppContext.Consumer>
            {app => (
              <ContinueButton
                disabled={!selected}
                onClick={() => (selected ? this.onSubmit(app) : null)}
              >
                Start Adventure
              </ContinueButton>
            )}
          </AppContext.Consumer>
        </CharacterContainer>
      </ScreenCenterWrapper>
    );
  }
}
