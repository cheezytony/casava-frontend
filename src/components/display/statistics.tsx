import { DataFormat, formatData } from '@/utils';
import { Paragraph } from '..';
import React from 'react';

export interface StatisticProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  heading?: React.ReactNode;
  format?: DataFormat;
  value?: string | number;
}

export const Statistic: React.FC<StatisticProps> = ({
  className = '',
  heading,
  orientation = 'vertical',
  format,
  value,
}) => {
  const flexDirection = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  const formattedValue = React.useMemo(() => {
    if (format && value) {
      return formatData(value, format) as string;
    }
    return value;
  }, [format, value]);
  return (
    <div className={`flex ${flexDirection} ${className}`}>
      <Paragraph className="opacity-60" size="sm">
        {heading}
      </Paragraph>
      <Paragraph>{formattedValue}</Paragraph>
    </div>
  );
};
