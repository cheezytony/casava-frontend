import { StringOrUnion } from '.';

export type DateTimeFormat = StringOrUnion<
  'date' | 'date:compact' | 'date:time' | 'date:compact:time' | 'time'
>;

export const dateTimeFormat = (
  dateValue: Date | string,
  type: DateTimeFormat = 'date:time'
) => {
  const date = new Date(dateValue);
  if (/Invalid/.test(date.toDateString())) return 'Invalid date provided';

  if (
    ![
      'date',
      'date:compact',
      'date:time',
      'date:compact:time',
      'time',
      null,
      undefined,
    ].includes(type as string)
  ) {
    return rawDateTimeFormat(date, type as string);
  }

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

export const rawDateTimeFormat = function (date?: Date, format = '') {
  if (!date) return '';

  const months = [
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
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const formatKeys = {
    y: () => date.getFullYear(),
    Y: () => date.getFullYear(),
    mm: () => {
      var month = date.getMonth() + 1;
      return month >= 10 ? month : `0${month}`;
    },
    m: () => date.getMonth() + 1,
    MM: () => months[date.getMonth()],
    M: () => months[date.getMonth()].slice(0, 3),
    dd: () => date.getDate(),
    d: () => date.getDay(),
    DD: () => days[date.getDay()],
    D: () => days[date.getDay()].slice(0, 3),
    hh: () => {
      var hours = formatKeys.h();
      return hours > 9 ? hours : `0${hours}`;
    },
    h: () => {
      var hours = date.getHours();
      return hours == 12 || hours == 0 ? 12 : hours % 12;
    },
    H: () => date.getHours(),
    i: () => {
      var mins = date.getMinutes();
      return mins >= 10 ? mins : `0${mins}`;
    },
    s: () => {
      var secs = date.getSeconds();
      return secs >= 10 ? secs : `0${secs}`;
    },
    a: () => (date.getHours() >= 12 ? 'pm' : 'am'),
    A: () => (date.getHours() >= 12 ? 'PM' : 'AM'),
  };
  return format.replace(/y|Y|mm|m|MM|M|dd|d|DD|D|hh|h|H|i|s|a|A/g, (key) => {
    return formatKeys[key as keyof typeof formatKeys].apply(date).toString();
  });
};

export const isSameDay = (date1?: Date, date2?: Date) => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isBefore = (date1?: Date, date2?: Date, orEquels = false) => {
  if (!date1 || !date2) return false;
  if (orEquels && isSameDay(date1, date2)) return true;
  return date1.getTime() < date2.getTime();
};

export const isAfter = (date1?: Date, date2?: Date, orEquels = false) => {
  if (!date1 || !date2) return false;
  if (orEquels && isSameDay(date1, date2)) return true;
  return date1.getTime() > date2.getTime();
};

export const isLeapYear = (y?: number) => {
  const year = y ?? new Date().getFullYear();
  return year % 4 === 0;
};
