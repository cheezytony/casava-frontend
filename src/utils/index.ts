import {
  numberFormat,
  dateTimeFormat,
  type DateTimeFormat,
  type NumberFormat,
} from '.';

export * from './dates';
export * from './numbers';
export * from './strings';

export type DataFormat = NumberFormat | DateTimeFormat;

export const formatData = (value: string | number | Date, type: DataFormat) => {
  switch (type) {
    case 'currency':
    case 'currency:compact':
    case 'number':
    case 'number:compact':
    case 'unit':
    case 'unit:compact':
    case 'percentage':
    case 'percentage:compact':
      return value
        ? numberFormat(value as number, type as NumberFormat)
        : value;
    case 'date':
    case 'date:compact':
    case 'date:compact:time':
    case 'date:time':
    case 'time':
      return value
        ? dateTimeFormat(value as Date, type as DateTimeFormat)
        : value;

    default:
      if (value?.constructor === Date) {
        return dateTimeFormat(value, 'date');
      }
      return value as string | number | null;
  }
};
