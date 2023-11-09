import { IsNullish } from "../types";

const isNullish = (obj: unknown) => obj === null || obj === undefined || typeof(obj) === 'undefined';

export const primitive = {
  isNotNullish: (obj: unknown) => !isNullish(obj),
  isNullish: (obj: unknown): obj is IsNullish => isNullish(obj),
  
  isNumber: (obj: unknown): obj is number => Number.isFinite(obj),
  isInteger: (obj: unknown): obj is number => Number.isInteger(obj),

  isBoolean: (obj: unknown): obj is boolean => typeof(obj) === 'boolean',
  isString: (obj: unknown): obj is string => typeof(obj) === 'string',

  isArray: (obj: unknown) => Array.isArray(obj),
  
}
