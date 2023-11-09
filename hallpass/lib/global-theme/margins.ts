import { CSSResult, unsafeCSS } from 'lit';

import { Nullable } from '../types';
import { primitive } from './../helpers/primitives';
const marginLocations = ['x','y','r','l','t','b','all'] as const;
export type MarginLocation = typeof marginLocations[number];
export type MarginParam = {[key in MarginLocation]?: number};

const marginParts = ['top','bottom','left','right'] as const;
type MarginPart = typeof marginParts[number];

export const buildMargin = (param: MarginParam): CSSResult => {
  return unsafeCSS(parseMargin(param));
}

//#region --->> HELPERS <<----

const convertMarginValue = (value: number): string => {
  const isNegative = value < 0;
  value = Math.floor(Math.abs(value));  //remove sign and any fractions
  return `${isNegative ? '-' : ''}${value/4}rem`;
}

const convertToMargin = (parts: {[key in MarginPart]: Nullable<number>}): string => {
  return Object.keys(parts).map((key) => {
    const value = parts[key as MarginPart];
    return primitive.isNullish(value) ? '' : `margin-${key}: ${convertMarginValue(value)};`;
  })
  .join(' ');
}

const allAreNullish = (param: MarginParam): boolean => {
  return Object.keys(param).every((key) => primitive.isNullish(param[key as MarginLocation]));
}

const parseMargin = (param: MarginParam): string => {
  if (allAreNullish(param)) {
    return ''
  }
  else if (primitive.isNotNullish(param.all)) {
    return `margin: ${param.all}`; //ignore any other params
  }
  

  const parts: {[key in MarginPart]: Nullable<number>} 
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

  return convertToMargin(parts);
}


//#endregion