export type DateTimeFormat =
  | 'date'
  | 'date:compact'
  | 'date:time'
  | 'date:compact:time'
  | 'time';

export const dateTimeFormat = (
  dateValue: Date | string,
  type: DateTimeFormat = 'date:time',
) => {
  const date = new Date(dateValue);
  if (/Invalid/.test(date.toDateString())) return 'Invalid date provided';

  const dateFormat: Intl.DateTimeFormatOptions = { dateStyle: 'long' };
  const dateCompactFormat: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
  };
  const timeFormat: Intl.DateTimeFormatOptions = {
    hourCycle: 'h12',
    timeStyle: 'short',
  };
  const dateTimeFormat: Intl.DateTimeFormatOptions = {
    ...dateFormat,
    ...timeFormat,
  };
  const dateCompactTimeFormat: Intl.DateTimeFormatOptions = {
    ...dateTimeFormat,
    ...dateCompactFormat,
  };

  const format = (() => {
    switch (type) {
      case 'date:time':
        return dateTimeFormat;
      case 'date:compact:time':
        return dateCompactTimeFormat;
      case 'time':
        return timeFormat;
      case 'date:compact':
        return dateCompactFormat;
      default:
        return dateFormat;
    }
  })();

  return Intl.DateTimeFormat('en-NG', format).format(date);
};

export const getMonths = (start = 0, end = 12) => {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ].slice(start, end + 1);
};

export const isLeapYear = (y?: number) => {
  const year = y ?? new Date().getFullYear();
  return year % 4 === 0;
};
