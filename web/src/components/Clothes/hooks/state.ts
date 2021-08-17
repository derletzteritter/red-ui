import { atom, useRecoilState } from 'recoil';
import { ClothingType } from '../../../types/character';

export const clothesState = {
  clothes: atom<{ [K in ClothingType]: string[] }>({
    key: 'clothes',
    default: null,
  }),
  activeCloth: atom<{ [K in ClothingType]: number }>({
    key: 'activeCloth',
    default: {
      belts: 0,
      boots: 0,
      chaps: 0,
      cloaks: 0,
      coats: 0,
      coats_closed: 0,
      gunbelts: 0,
      gloves: 0,
      pants: 0,
      vests: 0,
      shirts_full: 0,
      ponchos: 0,
      hats: 0,
    },
  }),
};

export const useActiveCloth = () => useRecoilState(clothesState.activeCloth);
export const useClothes = () => useRecoilState(clothesState.clothes);
