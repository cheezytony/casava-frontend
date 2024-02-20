type NumberStyle = 'number' | 'currency' | 'percentage' | 'unit';
export type NumberFormat = NumberStyle | `${NumberStyle}:compact`;

export const numberFormat = (
  number: number | string,
  type: NumberFormat = 'number',
  currency = 'NGN',
) => {
  const compactFormat: Intl.NumberFormatOptions = {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  };
  const currencyFormat: Intl.NumberFormatOptions = {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency,
  };
  const currencyCompactFormat: Intl.NumberFormatOptions = {
    ...currencyFormat,
    ...compactFormat,
  };
  const numberFormat: Intl.NumberFormatOptions = { style: 'decimal' };
  const numberCompactFormat: Intl.NumberFormatOptions = {
    ...numberFormat,
    ...compactFormat,
  };
  const percentageFormat: Intl.NumberFormatOptions = { style: 'percent' };
  const percentageCompactFormat: Intl.NumberFormatOptions = {
    ...percentageFormat,
    ...compactFormat,
  };

  const format = (() => {
    switch (type) {
      case 'currency':
        return currencyFormat;
      case 'currency:compact':
        return currencyCompactFormat;
      case 'percentage':
        return percentageFormat;
      case 'percentage:compact':
        return percentageCompactFormat;
      case 'number:compact':
        return numberCompactFormat;
      default:
        return numberFormat;
    }
  })();

  return Intl.NumberFormat(
    currency === 'USD' ? 'en-US' : 'en-NG',
    format,
  ).format(Number(number));
};

numberFormat(100);
