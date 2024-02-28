export interface StringInterface extends String {}
// Warning this type may NOT work with any thing that requires a primitive string type.
// However, it can be used with `as string` to convert it to a string.
// It should only be used to specify arguments that can be a string or a union of strings
// and not variables or properties that hold a string value.
export type StringOrUnion<Union extends string> = StringInterface | Union;

// Comment out the code below to see the error
// Type 'StringOrUnion<"date">' is not assignable to type 'string'.
//   Type 'StringInterface' is not assignable to type 'string'
// const stringOrUnion: StringOrUnion<'date'> = 'date';
// const string: string = stringOrUnion;

// This is how to use the StringOrUnion type
// function testStringUnionType(string: StringOrUnion<'date'>) {
//   console.log(string);
// }
// testStringUnionType('date'); // This works fine
// testStringUnionType('plain string'); // This works fine as well.

// This is where issues may arise.
// function testPlainStringType(string: string) {
//   console.log(string);
// }
// testPlainStringType('plain string'); // This works fine
// const string: StringOrUnion<'date'> = 'date';
// testPlainStringType(string); // This will throw an error
// testPlainStringType(string as string); // This fixes the error

export const breakString = (string: string) => {
  return string
    .replace(/([\sA-Z_-])/g, (match) => {
      if (/[_-]/.test(match)) return ' ';
      if (match === ' ') return match;
      return ` ${match}`;
    })
    .toLowerCase()
    .trim()
    .split(' ');
};

export const camelCase = (string: string) => {
  return breakString(string)
    .map((word: string, index) => {
      return index === 0 ? word : ucFirst(word);
    })
    .join('');
};

export const pascalCase = (string: string) => {
  return breakString(string)
    .map((word: string) => ucFirst(word))
    .join('');
};

export const kebabCase = (string: string) => {
  return breakString(string).join('-');
};

export const snakeCase = (string: string) => {
  return breakString(string).join('_');
};

export const sentenceCase = (string: string) => {
  return breakString(string)
    .map((word: string, index) => {
      return index === 0 ? ucFirst(word) : word;
    })
    .join(' ');
};

export const titleCase = (string: string) => {
  return breakString(string)
    .map((word: string) => ucFirst(word))
    .join(' ');
};

export const uppercase = (string: string) => string?.toUpperCase();

export const lowercase = (string: string) => string?.toLowerCase();

export const ucFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1, string.length);
};

export const truncate = (string: string, length = 30, after = '...') => {
  if (string.length <= length) return string;
  return string.slice(0, length) + after;
};

export const reverse = (string: string) => string.split('').reverse().join('');

export const queryToObject = <T = Record<string, string>>(
  string: string
): T => {
  return string
    .trim()
    .replace(/^\?/, '')
    .split('&')
    .reduce((query: Record<string, any>, pair: string) => {
      const [key, value] = pair.split('=');
      query[key] = decodeURIComponent(value);
      return query;
    }, {}) as T;
};

/* #__PURE__ */
export const objectToQuery = (object: Record<string, any>) => {
  return Object.keys(object)
    .map((key) => `${key}=${encodeURIComponent(object[key])}`)
    .join('&');
};

export const nameToInitials = (string: string, max = 2) => {
  return string
    .split(' ')
    .map((word) => word[0])
    .slice(0, max)
    .join('');
};
