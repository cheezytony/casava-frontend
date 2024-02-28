import { FormInputValue } from '.';

const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes: Array<string> = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const SEQUENCES = ['abc', '123'];

export type FormValidationRule<
  TKeys extends Record<string, FormInputValue> = Record<string, FormInputValue>
> = Exclude<
  keyof FormValidatorProtoype<TKeys>,
  | 'rules'
  | '_alphabets'
  | '_string'
  | '_array'
  | '_number'
  | '_file'
  | '_date'
  | '_boolean'
  | '_form'
  | '_other'
>;

export class FormValidatorProtoype<
  TKeys extends Record<string, FormInputValue>
> {
  constructor() {}

  rules: Record<
    string,
    {
      message: string;
      test: (
        value: FormInputValue | Array<FormInputValue>,
        values: TKeys
      ) => boolean;
    }
  > = {};

  _alphabets = {
    alphabets: this.alphabets.bind(this),
    only: this.alphabetsOnly.bind(this),
    lowercase: this.alphabetsLowercase.bind(this),
    lowercaseOnly: this.alphabetsLowercaseOnly.bind(this),
    uppercase: this.alphabetsUppercase.bind(this),
    uppercaseOnly: this.alphabetsUppercaseOnly.bind(this),
  };

  _string = {
    email: this.email.bind(this),
    in: this.stringIncludedIn.bind(this),
    length: this.stringLength.bind(this),
    matches: this.stringMatches.bind(this),
    max: this.stringMax.bind(this),
    min: this.stringMin.bind(this),
    money: this.money.bind(this),
    name: this.name.bind(this),
    noSequence: this.noSequence.bind(this),
    phone: this.phone.bind(this),
    specialCharacters: this.specialCharacters.bind(this),
    specialCharactersOnly: this.specialCharactersOnly.bind(this),
    url: this.url.bind(this),
  };

  _array = {
    contains: this.arrayContains.bind(this),
    doesntContain: this.arrayDoesntContain.bind(this),
    length: this.arrayLength.bind(this),
    max: this.arrayMax.bind(this),
    min: this.arrayMin.bind(this),
  };

  _number = {
    numbers: this.numbers.bind(this),
    only: this.numbersOnly.bind(this),
    between: this.numbersBetween.bind(this),
    exact: this.numbersExact.bind(this),
    max: this.numbersMax.bind(this),
    min: this.numbersMin.bind(this),
  };

  _file = {
    file: this.file.bind(this),
    fileSizeMax: this.fileSizeMax.bind(this),
    image: this.image.bind(this),
  };

  _date = {
    date: this.date.bind(this),
  };

  _boolean = {
    true: this.true.bind(this),
  };

  _form = {
    exact: this.exact.bind(this),
    // nullable: this.nullable.bind(this),
  };

  // Other validations that do not fit the above categories can be placed here
  _other = {
    exact: this.exact.bind(this),
    // nullable: this.nullable.bind(this),
    // true: this.true.bind(this),
  };

  alphabets(message?: string) {
    this.rules.alphabets = {
      message: message ?? 'This field must contain letters.',
      test: (value) => !!value?.toString().match(/[a-z A-Z]/),
    };
    return this;
  }

  alphabetsLowercase(message?: string) {
    this.rules.alphabetsLowercase = {
      message: message ?? 'This field must contain lowercase letters.',
      test: (value) => !!value?.toString().match(/[a-z]/),
    };
    return this;
  }

  alphabetsLowercaseOnly(message?: string) {
    this.rules.alphabetsLowercaseOnly = {
      message: message ?? 'This field must contain only lowercase alphabets.',
      test: (value) => !!value?.toString().match(/^[a-z]+$/),
    };
    return this;
  }

  alphabetsOnly(message?: string) {
    this.rules.alphabetsOnly = {
      message: message ?? 'This field must contain only alphabets.',
      test: (value) => !!value?.toString().match(/^[a-z A-Z]+$/),
    };
    return this;
  }

  alphabetsUppercase(message?: string) {
    this.rules.alphabetsUppercase = {
      message: message ?? 'This field must contain uppercase alphabets.',
      test: (value) => !!value?.toString().match(/[A-Z]/),
    };
    return this;
  }

  alphabetsUppercaseOnly(message?: string) {
    this.rules.alphabetsUppercaseOnly = {
      message: message ?? 'This field must contain only uppercase alphabets.',
      test: (value) => !!value?.toString().match(/^[A-Z]+$/),
    };
    return this;
  }

  arrayContains(array: Array<FormInputValue>, message?: string) {
    this.rules.arrayContains = {
      message: `This field has to contain any of these: ${array.join(', ')}.`,
      test: (value) => array.includes(value as string),
    };
    return this;
  }

  arrayDoesntContain(array: Array<FormInputValue>, message?: string) {
    this.rules.arrayDoesntContain = {
      message: `This field cannot contain any of these: ${array.join(', ')}.`,
      test: (value) => !array.includes(value as string),
    };
    return this;
  }

  arrayLength(length: Array<FormInputValue>, message?: string) {
    this.rules.arrayLength = {
      message: `Exactly ${length} items are required.`,
      test: (value) => (value as Array<string>)?.length === Number(length),
    };
    return this;
  }

  arrayMax(max: Array<FormInputValue>, message?: string) {
    this.rules.arrayMax = {
      message: `At most ${max} items are required.`,
      test: (value) => ((value as Array<string>)?.length || 0) <= Number(max),
    };
    return this;
  }

  arrayMin(min: Array<FormInputValue>, message?: string) {
    this.rules.arrayMin = {
      message: `At least ${min} items are required.`,
      test: (value) => ((value as Array<string>)?.length || 0) >= Number(min),
    };
    return this;
  }

  date(message?: string) {
    this.rules.date = {
      message: message ?? 'This field must be a valid date.',
      test: (value) =>
        value?.constructor === Date ||
        !Number.isNaN(new Date(value as string).getDate()),
    };
    return this;
  }

  email(message?: string) {
    this.rules.email = {
      message: message ?? 'This field has to be a valid email address.',
      test: (value) =>
        !!value
          ?.toString()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
    };
    return this;
  }

  exact(fieldName: string, message?: string) {
    this.rules.exact = {
      message: `This field should be the same as the ${fieldName} field.`,
      test: (value, values) => {
        return value === values[fieldName];
      },
    };
    return this;
  }

  file(message?: string) {
    this.rules.file = {
      message: message ?? 'A file has to be chosen for this field.',
      test: (value) => value?.constructor === File,
    };
    return this;
  }

  fileSizeMax(maxSize: number, message?: string) {
    const size = formatBytes(Number(maxSize));
    this.rules.fileSizeMax = {
      message: message ?? `The file size should be less than ${size}`,
      test: (value) => {
        const file = value as File;
        return file?.constructor === File && file.size < Number(maxSize);
      },
    };
    return this;
  }

  image(message?: string) {
    this.rules.image = {
      message: message ?? 'This file has to be an image.',
      test: (value) =>
        value?.constructor === File && value.type.startsWith('image'),
    };
    return this;
  }

  money(message?: string) {
    this.rules.money = {
      message:
        message ?? 'This field can only money format and in 2 decimal places.',
      test: (value) => !!value?.toString().match(/^\d+(\.\d{1,2})?$/),
    };
    return this;
  }

  name(message?: string) {
    this.rules.name = {
      message: message ?? 'This field has to be a valid full name.',
      test: (value) => !!value?.toString().match(/\w{2}(\s\w{2})+/),
    };
    return this;
  }

  noSequence(message?: string) {
    this.rules.noSequence = {
      message:
        message ?? 'This field must not contain simple sequences like abc, 123',
      test: (value) =>
        !value?.toString()?.match(new RegExp(SEQUENCES.join('|'))),
    };
    return this;
  }

  nullable(message?: string) {
    this.rules.nullable = { message: message ?? '', test: () => true };
    return this;
  }

  numbersBetween(start: number, end: number, message?: string) {
    this.rules.numberBetween = {
      message: `This field must be between ${start} and ${end}.`,
      test: (value) =>
        Number(value) > Number(start) && Number(value) < Number(end),
    };
    return this;
  }

  numbersExact(expected: number, message?: string) {
    this.rules.numberExact = {
      message: `This field has to be exactly ${expected}.`,
      test: (value) => Number(value) === Number(expected),
    };
    return this;
  }

  numbersMax(max: number, message?: string) {
    this.rules.numberMax = {
      message: `This field cannot be more than ${max}.`,
      test: (value) => Number(value) <= Number(max),
    };
    return this;
  }

  numbersMin(min: number, message?: string) {
    this.rules.numberMin = {
      message: `This field cannot be less then ${min}.`,
      test: (value) => Number(value) >= Number(min),
    };
    return this;
  }

  numbers(message?: string) {
    this.rules.numbers = {
      message: message ?? 'This field must contain numbers.',
      test: (value) =>  !!value?.toString().match(/\d/),
    };
    return this;
  }

  numbersOnly(message?: string) {
    this.rules.numbersOnly = {
      message: message ?? 'This field must contain only numbers.',
      test: (value) => !!value?.toString().match(/^\d+$/),
    };
    return this;
  }

  phone(message?: string) {
    this.rules.phone = {
      message:
        message ?? 'The field has to be a valid nigerian address number.',
      test: (value) =>
        !!value?.toString().match(/^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/),
    };
    return this;
  }

  specialCharacters(message?: string) {
    this.rules.specialCharacters = {
      message: message ?? 'This field must contain punctuations.',
      test: (value) => !!value?.toString().match(/[^a-zA-Z0-9]+/),
    };
    return this;
  }

  specialCharactersOnly(message?: string) {
    this.rules.specialCharactersOnly = {
      message: message ?? 'This field must contain only punctuations.',
      test: (value) => !!value?.toString().match(/^[^a-zA-Z0-9]+$/),
    };
    return this;
  }

  stringIncludedIn(array: Array<string>, message?: string) {
    this.rules.stringIncludedIn = {
      message: `This field must be any one of these: ${array.join(', ')}`,
      test: (value) => array.includes(value as string),
    };
    return this;
  }

  stringMatches(expected: string | RegExp, message?: string) {
    this.rules.stringExact = {
      message: `This field has to be ${expected}.`,
      test: (value) => !!value?.toString().match(expected),
    };
    return this;
  }

  stringLength(length: number, message?: string) {
    this.rules.stringLength = {
      message: `This field has to be exactly ${length} characters.`,
      test: (value) => value?.toString().length === Number(length),
    };
    return this;
  }

  stringMax(max: number, message?: string) {
    this.rules.stringMax = {
      message: `This field has to contain less than ${max} characters.`,
      test: (value) => (value?.toString().length || 0) <= Number(max),
    };
    return this;
  }

  stringMin(min: number, message?: string) {
    this.rules.stringMin = {
      message: `This field has to contain at least ${min} characters.`,
      test: (value) => (value?.toString().length || 0) >= Number(min),
    };
    return this;
  }

  true(message?: string) {
    this.rules.true = {
      message: message ?? 'This field has to be true.',
      test: (value) => !!value,
    };
    return this;
  }

  url(message?: string) {
    this.rules.url = {
      message: message ?? 'This field has to be a valid url address',
      test: (value) =>
        !!value
          ?.toString()
          .match(
            /[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/
          ),
    };
    return this;
  }

  required(message?: string) {
    this.rules.required = {
      message: message ?? 'This field is required.',
      test: (value) => !!value?.toString().length,
    };
    return this;
  }

  custom({
    test,
    message,
  }: {
    test: (
      value: FormInputValue | FormInputValue[],
      values: Record<keyof TKeys, FormInputValue | FormInputValue[]>
    ) => boolean;
    message: string;
  }) {
    this.rules.custom = {
      message,
      test: (value, values) => test(value, values),
    };
    return this;
  }
}
