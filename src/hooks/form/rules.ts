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
> = Exclude<keyof FormValidatorProtoype<TKeys>, 'rules'>;

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

  alphabets = {
    alphabets: this._alphabets.bind(this),
    only: this._alphabetsOnly.bind(this),
    lowercase: this._alphabetsLowercase.bind(this),
    lowercaseOnly: this._alphabetsLowercaseOnly.bind(this),
    uppercase: this._alphabetsUppercase.bind(this),
    uppercaseOnly: this._alphabetsUppercaseOnly.bind(this),
  };

  string = {
    email: this._email.bind(this),
    in: this._stringIncludedIn.bind(this),
    length: this._stringLength.bind(this),
    matches: this._stringMatches.bind(this),
    max: this._stringMax.bind(this),
    min: this._stringMin.bind(this),
    money: this._money.bind(this),
    name: this._name.bind(this),
    noSequence: this._noSequence.bind(this),
    phone: this._phone.bind(this),
    specialCharacters: this._specialCharacters.bind(this),
    specialCharactersOnly: this._specialCharactersOnly.bind(this),
    url: this._url.bind(this),
  };

  array = {
    contains: this._arrayContains.bind(this),
    doesntContain: this._arrayDoesntContain.bind(this),
    length: this._arrayLength.bind(this),
    max: this._arrayMax.bind(this),
    min: this._arrayMin.bind(this),
  };

  number = {
    numbers: this._numbers.bind(this),
    only: this._numbersOnly.bind(this),
    between: this._numbersBetween.bind(this),
    exact: this._numbersExact.bind(this),
    max: this._numbersMax.bind(this),
    min: this._numbersMin.bind(this),
  };

  file = {
    file: this._file.bind(this),
    fileSizeMax: this._fileSizeMax.bind(this),
    image: this._image.bind(this),
  };

  date = {
    date: this._date.bind(this),
  };

  boolean = {
    true: this._true.bind(this),
  };

  form = {
    exact: this._exact.bind(this),
    // nullable: this._nullable.bind(this),
  };

  // Other validations that do not fit the above categories can be placed here
  other = {
    exact: this._exact.bind(this),
    // nullable: this._nullable.bind(this),
    // true: this._true.bind(this),
  };

  _alphabets(message?: string) {
    this.rules.alphabets = {
      message: message ?? 'This field must contain letters.',
      test: (value) => !!value?.toString().match(/[a-z A-Z]/),
    };
    return this;
  }

  _alphabetsLowercase(message?: string) {
    this.rules.alphabetsLowercase = {
      message: message ?? 'This field must contain lowercase letters.',
      test: (value) => !!value?.toString().match(/[a-z]/),
    };
    return this;
  }

  _alphabetsLowercaseOnly(message?: string) {
    this.rules.alphabetsLowercaseOnly = {
      message: message ?? 'This field must contain only lowercase alphabets.',
      test: (value) => !!value?.toString().match(/^[a-z]+$/),
    };
    return this;
  }

  _alphabetsOnly(message?: string) {
    this.rules.alphabetsOnly = {
      message: message ?? 'This field must contain only alphabets.',
      test: (value) => !!value?.toString().match(/^[a-z A-Z]+$/),
    };
    return this;
  }

  _alphabetsUppercase(message?: string) {
    this.rules.alphabetsUppercase = {
      message: message ?? 'This field must contain uppercase alphabets.',
      test: (value) => !!value?.toString().match(/[A-Z]/),
    };
    return this;
  }

  _alphabetsUppercaseOnly(message?: string) {
    this.rules.alphabetsUppercaseOnly = {
      message: message ?? 'This field must contain only uppercase alphabets.',
      test: (value) => !!value?.toString().match(/^[A-Z]+$/),
    };
    return this;
  }

  _arrayContains(array: Array<FormInputValue>, message?: string) {
    this.rules.arrayContains = {
      message: `This field has to contain any of these: ${array.join(', ')}.`,
      test: (value) => array.includes(value as string),
    };
    return this;
  }

  _arrayDoesntContain(array: Array<FormInputValue>, message?: string) {
    this.rules.arrayDoesntContain = {
      message: `This field cannot contain any of these: ${array.join(', ')}.`,
      test: (value) => !array.includes(value as string),
    };
    return this;
  }

  _arrayLength(length: Array<FormInputValue>, message?: string) {
    this.rules.arrayLength = {
      message: `Exactly ${length} items are required.`,
      test: (value) => (value as Array<string>)?.length === Number(length),
    };
    return this;
  }

  _arrayMax(max: Array<FormInputValue>, message?: string) {
    this.rules.arrayMax = {
      message: `At most ${max} items are required.`,
      test: (value) => ((value as Array<string>)?.length || 0) <= Number(max),
    };
    return this;
  }

  _arrayMin(min: Array<FormInputValue>, message?: string) {
    this.rules.arrayMin = {
      message: `At least ${min} items are required.`,
      test: (value) => ((value as Array<string>)?.length || 0) >= Number(min),
    };
    return this;
  }

  _date(message?: string) {
    this.rules.date = {
      message: message ?? 'This field must be a valid date.',
      test: (value) =>
        value?.constructor === Date ||
        !Number.isNaN(new Date(value as string).getDate()),
    };
    return this;
  }

  _email(message?: string) {
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

  _exact(fieldName: string, message?: string) {
    this.rules.exact = {
      message: `This field should be the same as the ${fieldName} field.`,
      test: (value, values) => {
        return value === values[fieldName];
      },
    };
    return this;
  }

  _file(message?: string) {
    this.rules.file = {
      message: message ?? 'A file has to be chosen for this field.',
      test: (value) => value?.constructor === File,
    };
    return this;
  }

  _fileSizeMax(maxSize: number) {
    const size = formatBytes(Number(maxSize));
    this.rules.fileSizeMax = {
      message: `The file size should be less than ${size}`,
      test: (value) => {
        const file = value as File;
        return file?.constructor === File && file.size < Number(maxSize);
      },
    };
    return this;
  }

  _image(message?: string) {
    this.rules.image = {
      message: message ?? 'This file has to be an image.',
      test: (value) =>
        value?.constructor === File && value.type.startsWith('image'),
    };
    return this;
  }

  _money(message?: string) {
    this.rules.money = {
      message: message ?? 'This field can only money format and in 2 decimal places.',
      test: (value) => !!value?.toString().match(/^\d+(\.\d{1,2})?$/),
    };
    return this;
  }

  _name(message?: string) {
    this.rules.name = {
      message: message ?? 'This field has to be a valid full name.',
      test: (value) => !!value?.toString().match(/\w{2}(\s\w{2})+/),
    };
    return this;
  }

  _noSequence(message?: string) {
    this.rules.noSequence = {
      message: message ?? 'This field must not contain simple sequences like abc, 123',
      test: (value) =>
        !value?.toString()?.match(new RegExp(SEQUENCES.join('|'))),
    };
    return this;
  }

  _nullable(message?: string) {
    this.rules.nullable = { message: message ?? '', test: () => true };
    return this;
  }

  _numbersBetween(start: number, end: number, message?: string) {
    this.rules.numberBetween = {
      message: `This field must be between ${start} and ${end}.`,
      test: (value) =>
        Number(value) > Number(start) && Number(value) < Number(end),
    };
    return this;
  }

  _numbersExact(expected: number, message?: string) {
    this.rules.numberExact = {
      message: `This field has to be exactly ${expected}.`,
      test: (value) => Number(value) === Number(expected),
    };
    return this;
  }

  _numbersMax(max: number, message?: string) {
    this.rules.numberMax = {
      message: `This field cannot be more than ${max}.`,
      test: (value) => Number(value) <= Number(max),
    };
    return this;
  }

  _numbersMin(min: number, message?: string) {
    this.rules.numberMin = {
      message: `This field cannot be less then ${min}.`,
      test: (value) => Number(value) >= Number(min),
    };
    return this;
  }

  _numbers(message?: string) {
    this.rules.numbers = {
      message: message ?? 'This field must contain numbers.',
      test: (value) => !!value?.toString().match(/\d/),
    };
    return this;
  }

  _numbersOnly(message?: string) {
    this.rules.numbersOnly = {
      message: message ?? 'This field must contain only numbers.',
      test: (value) => !!value?.toString().match(/^\d+$/),
    };
    return this;
  }

  _phone(message?: string) {
    this.rules.phone = {
      message: message ?? 'The field has to be a valid nigerian address number.',
      test: (value) =>
        !!value?.toString().match(/^(\+|)(234|0)(7|8|9)(0|1)\d{8}$/),
    };
    return this;
  }

  _specialCharacters(message?: string) {
    this.rules.specialCharacters = {
      message: message ?? 'This field must contain punctuations.',
      test: (value) => !!value?.toString().match(/[^a-zA-Z0-9]+/),
    };
    return this;
  }

  _specialCharactersOnly(message?: string) {
    this.rules.specialCharactersOnly = {
      message: message ?? 'This field must contain only punctuations.',
      test: (value) => !!value?.toString().match(/^[^a-zA-Z0-9]+$/),
    };
    return this;
  }

  _stringIncludedIn(array: Array<string>, message?: string) {
    this.rules.stringIncludedIn = {
      message: `This field must be any one of these: ${array.join(', ')}`,
      test: (value) => array.includes(value as string),
    };
    return this;
  }

  _stringMatches(expected: string | RegExp, message?: string) {
    this.rules.stringExact = {
      message: `This field has to be ${expected}.`,
      test: (value) => !!value?.toString().match(expected),
    };
    return this;
  }

  _stringLength(length: number, message?: string) {
    this.rules.stringLength = {
      message: `This field has to be exactly ${length} characters.`,
      test: (value) => value?.toString().length === Number(length),
    };
    return this;
  }

  _stringMax(max: number, message?: string) {
    this.rules.stringMax = {
      message: `This field has to contain less than ${max} characters.`,
      test: (value) => (value?.toString().length || 0) <= Number(max),
    };
    return this;
  }

  _stringMin(min: number, message?: string) {
    this.rules.stringMin = {
      message: `This field has to contain at least ${min} characters.`,
      test: (value) => (value?.toString().length || 0) >= Number(min),
    };
    return this;
  }

  _true(message?: string) {
    this.rules.true = {
      message: message ?? 'This field has to be true.',
      test: (value) => !!value,
    };
    return this;
  }

  _url(message?: string) {
    this.rules.url = {
      message: message ?? 'This field has to be a valid url address',
      test: (value) =>
        !!value
          ?.toString()
          .match(
            /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
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
}
