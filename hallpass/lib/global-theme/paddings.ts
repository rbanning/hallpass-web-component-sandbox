import { CSSResult, unsafeCSS } from 'lit';

import { Nullable } from '../types';
import { primitive } from '../helpers/primitives';
const paddingLocations = ['x','y','r','l','t','b','all'] as const;
export type PaddingLocation = typeof paddingLocations[number];
export type PaddingParam = {[key in PaddingLocation]?: number};

const paddingParts = ['top','bottom','left','right'] as const;
type PaddingPart = typeof paddingParts[number];

export const buildPadding = (param: PaddingParam): CSSResult => {
  return unsafeCSS(parsePadding(param));
}

//#region --->> HELPERS <<----

const convertPaddingValue = (value: number): string => {
  const isNegative = value < 0;
  value = Math.floor(Math.abs(value));  //remove sign and any fractions
  return `${isNegative ? '-' : ''}${value/4}rem`;
}

const convertToPadding = (parts: {[key in PaddingPart]: Nullable<number>}): string => {
  return Object.keys(parts).map((key) => {
    const value = parts[key as PaddingPart];
    return primitive.isNullish(value) ? '' : `padding-${key}: ${convertPaddingValue(value)};`;
  })
  .join(' ');
}

const allAreNullish = (param: PaddingParam): boolean => {
  return Object.keys(param).every((key) => primitive.isNullish(param[key as PaddingLocation]));
}

const parsePadding = (param: PaddingParam): string => {
  if (allAreNullish(param)) {
    return '';
  }
  else if (primitive.isNotNullish(param.all)) {
    return `padding: ${param.all}`; //ignore any other params
  }

  const parts: {[key in PaddingPart]: Nullable<number>} 
    = {top: null, bottom: null, left: null, right: null};
  if (primitive.isNotNullish(param.x)) {
    parts.left = param.x;
    parts.right = param.x;
  }
  if (primitive.isNotNullish(param.y)) {
    parts.top = param.y;
    parts.bottom = param.y;
  }
  //the following might override previously set params
  if (primitive.isNotNullish(param.t)) { parts.top = param.t; }
  if (primitive.isNotNullish(param.b)) { parts.bottom = param.b; }
  if (primitive.isNotNullish(param.r)) { parts.right = param.r; }
  if (primitive.isNotNullish(param.l)) { parts.left = param.l; }

  return convertToPadding(parts);
}

//#endregion