import React, { useCallback, useEffect, useState } from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { debugData } from '../../utils/debugData';
import styles from './clothes.module.scss';
import { fetchNui } from '../../utils/fetchNui';
import { useActiveCloth, useClothes } from './hooks/state';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { log } from 'util';
import { ClothingType } from '../../types/character';

debugData([
  {
    action: 'setClothesVisibility',
    data: true,
  },
]);

debugData([
  {
    action: 'setClothes',
    data: {
      hats: ['34534435'],
      belts: ['23424'],
      boots: ['45645456'],
      chaps: ['3242323'],
      cloaks: ['3423324'],
      gloves: ['2343'],
      vests: ['542323'],
      coats: ['23423432'],
      pants: ['234232423'],
      shirts_full: ['53455'],
      ponchos: ['234234'],
      coats_closed: ['34534535'],
      gunbelts: ['23423242', '23422342'],
    },
  },
]);

debugData([
  {
    action: 'setClothesValue',
    data: {
      belts: 4,
      boots: 0,
      chaps: 6,
      cloaks: 0,
      coats: 0,
      coats_closed: 0,
      dresses: 0,
      gunbelts: 0,
      gloves: 10,
      pants: 0,
      vests: 0,
      shirts_full: 0,
      ponchos: 0,
      hats: 0,
    },
  },
]);

const Clothes: React.FC = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [clothes, setClothes] = useClothes();
  const [category, setCategory] = useState('');
  const [active, setActive] = useActiveCloth();

  useNuiEvent('setClothesVisibility', (data) => {
    setVisibility(data);
  });

  useNuiEvent('setClothesValue', (data) => {
    setActive(data);
  });

  useNuiEvent('setClothes', (data) => {
    setClothes(data);
  });

  const handleNextCloth = useCallback(
    (clothing: ClothingType) => {
      setCategory(clothing);
      setActive((curVal) => ({
        ...curVal,
        [clothing]: curVal[clothing] + 1,
      }));
    },
    [setActive, setCategory],
  );

  const handleBackCloth = useCallback(
    (clothing: ClothingType) => {
      setCategory(clothing);
      setActive((curVal: any) => ({
        ...curVal,
        [clothing]: curVal[clothing] - 1,
      }));
    },
    [setActive, setCategory],
  );

  const handleSaveClothes = async () => {
    await fetchNui('clothes:updateClothes', active);
  };

  const handleCloseMenu = async () => {
    await fetchNui('clothes:closeMenu');
  };

  useEffect(() => {
    if (category) {
      fetchNui('clothes:changeClothes', { key: category, value: active[category as ClothingType] });
    }
  }, [active, category]);

  return (
    <>
      {visibility && (
        <div className={styles.clothesWrapper}>
          <div className={styles.header}>
            <button onClick={handleSaveClothes}>Save</button>
            <button onClick={handleCloseMenu}>Close</button>
          </div>
          <div className={styles.clothesContainer}>
            <React.Fragment>
              {clothes &&
                (Object.keys(clothes) as ClothingType[]).map((clothing: ClothingType) => (
                  <div className={styles.clothingItem}>
                    <div>
                      <h4>{clothing.toUpperCase()}</h4>
                    </div>
                    <div className={styles.itemSelector}>
                      <MdKeyboardArrowLeft
                        className={styles.navigateBtn}
                        onClick={() => handleBackCloth(clothing)}
                        size={34}
                        color="#A2672F"
                      />
                      <div>
                        {active[clothing]} / {clothes[clothing].length}
                      </div>
                      <MdKeyboardArrowRight
                        className={styles.navigateBtn}
                        onClick={() => handleNextCloth(clothing)}
                        size={34}
                        color="#A2672F"
                      />
                    </div>
                  </div>
                ))}
            </React.Fragment>
          </div>
        </div>
      )}
    </>
  );
};
export default Clothes;
