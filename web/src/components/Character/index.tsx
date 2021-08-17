import React, { useState } from 'react';
import styles from './character.module.scss';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { debugData } from '../../utils/debugData';
import { CharacterProps } from '../../types/character';
import {fetchNui} from "../../utils/fetchNui";

debugData([
  {
    action: 'setCharacterVisibility',
    data: false,
  },
]);

debugData([
  {
    action: 'setCharacters',
    data: [
      {
        charid: 1,
        name: 'Chip dip',
      },
      {
        charid: 2,
        name: 'Fee male',
      },
    ],
  },
]);

const Character: React.FC = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterProps[]>([]);

  useNuiEvent('setCharacterVisibility', (data: boolean) => {
    setVisibility(data);
  });

  useNuiEvent('setCharacters', (data: CharacterProps[]) => {
    setCharacters(data);
  });
  
  const handleSelectCharacter = async (character: CharacterProps) => {
    await fetchNui('ui:selectCharacter', character);
  }

  return (
    <>
      {visibility && (
        <div className={styles.characterWrapper}>
          <div>
            <h1>Character Selection</h1>
          </div>
          <div className={styles.characterContainer}>
            {characters && characters.map((character) => (
              <div
                key={character.charid}
                className={styles.characterBox}
                onClick={() => handleSelectCharacter(character)}
              >
                <h4>{character.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Character;
