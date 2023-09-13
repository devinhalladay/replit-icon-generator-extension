import { ICON_SETS } from './constants';
import { atom } from "jotai";
import { IconType } from "react-icons";
import { BsPuzzle } from "react-icons/bs";
import Module from 'module';

export type IconSet = {
  name: string;
  icon: IconType;
}

export const selectedIconAtom = atom<IconSet | null>({
  icon: BsPuzzle,
  name: "BsPuzzle",
});

export type IconSetID = typeof ICON_SETS[number];
export const selectedIconSetAtom = atom<IconSetID>(ICON_SETS[0]);

export const iconModulesAtom = atom<IconSet[] | null>([]);