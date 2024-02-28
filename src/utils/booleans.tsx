/**
 * Checks if a value is null.
 * 
 * @param value - The value to check.
 * @returns True if the value is null, false otherwise.
 */
export const isNull = (value: any): boolean => value === null;

/**
 * Checks if a value is undefined.
 * 
 * @param value - The value to check.
 * @returns True if the value is undefined, false otherwise.
 */
export const isUndefined = (value: any): boolean => value === undefined;

/**
 * Checks if a value is null or undefined.
 * 
 * @param value - The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 */
export const isSet = (value: any): boolean => isNull(value) || isUndefined(value);

/**
 * Checks if a value is empty.
 * @param value - The value to check.
 * @returns True if the value is empty, false otherwise.
 */
export const isEmpty = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return !!value;
};
