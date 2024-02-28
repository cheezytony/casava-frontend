import { isAfter, isBefore, isSameDay } from '@/utils';
import React, { forwardRef } from 'react';
import { Button, Dropdown, DropdownIcon, Icon, Paragraph, Width } from '..';

export type DatepickerSelected = Date | [Date | null, Date | null] | null;
export type DatepickerType = 'simple' | 'single' | 'range';

export interface DatepickerProps {
  max?: Date;
  min?: Date;
  type?: DatepickerType;
  value?: DatepickerSelected;
  onChange?: (value: DatepickerSelected) => void;
  onCancel?: () => void;
}

export const Datepicker = forwardRef<HTMLDivElement, DatepickerProps>(
  ({ max, min, type = 'single', value, onChange, onCancel }, ref) => {
    const today = new Date();
    const isLeapYear = React.useMemo(() => {
      const y = today.getFullYear();
      return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    }, [today]);

    const [from, setFrom] = React.useState(today);
    const [to, setTo] = React.useState<Date | null>(null);

    const [rangeStep, setRangeStep] = React.useState<'from' | 'to'>('from');

    const [hovered, setHovered] = React.useState<Date | null>(null);
    const [selected, setSelected] = React.useState<DatepickerSelected>(null);
    const fromMonthData = React.useMemo(
      () => getMonths(isLeapYear)[from.getMonth()],
      [from, isLeapYear]
    );

    const monthOptions = React.useMemo(() => {
      return getMonths().map((month, i) => {
        const firstDayDate = new Date(from.getFullYear(), i, 1);
        const lastDayDate = new Date(from.getFullYear(), i, month.days);
        const isDisabled =
          (min && isBefore(firstDayDate, min)) ||
          (max && isAfter(lastDayDate, max));
        return {
          isDisabled,
          value: i,
          label: month.name,
          onClick: () => goToMonth(i),
        };
      });
    }, []);
    const yearOptions = React.useMemo(() => {
      return Array.from(
        { length: 100 },
        (_, i) => today.getFullYear() - 50 + i
      ).map((year) => ({
        isDisabled:
          (min && year < min.getFullYear()) ||
          (max && year > max.getFullYear()),
        value: year,
        label: year.toString(),
        onClick: () => goToYear(year),
      }));
    }, []);
    const selectedMonthIndex = React.useMemo(() => {
      return from.getMonth();
    }, [from]);
    const selectedYearIndex = React.useMemo(() => {
      return yearOptions.findIndex((year) => year.value === from.getFullYear());
    }, [from]);

    const selectDate = (date: Date) => {
      if (type === 'simple') return;
      if (type === 'single') return setSelected(date);

      if (Array.isArray(selected)) {
        if (isBefore(date, selected[0] as Date)) {
          setSelected([date, null]);
          return setRangeStep('to');
        }
        if (rangeStep === 'to') {
          setSelected((selected) => {
            return [(selected as Date[])[0], date];
          });
          return setRangeStep('from');
        }
      }

      setSelected([date, null]);
      return setRangeStep('to');
    };

    const reset = () => {
      setFrom(today);
      setTo(null);
      setHovered(null);
      setSelected(value ?? null);
      onCancel?.();
    };

    const emitChange = () => {
      onChange?.(selected);
    };

    const goToMonth = (index: number) => {
      from.setMonth(index);
      setFrom(new Date(from));
    };
    const goToPrevMonth = () => {
      from.setMonth(from.getMonth() - 1);
      setFrom(() => {
        return new Date(from);
      });
    };
    const goToNextMonth = () => {
      from.setMonth(from.getMonth() + 1);
      setFrom(new Date(from));
    };

    const goToYear = (year: number) => {
      from.setFullYear(year);
      setFrom(new Date(from));
    };

    React.useEffect(() => {
      setSelected(value ?? null);
    }, [type, value]);

    return (
      <DatepickerContext.Provider
        value={{
          today,
          isLeapYear,

          from,
          setFrom,

          to,
          setTo,

          hovered,
          setHovered,

          selected,
          selectDate,

          type,
          rangeStep,
        }}
      >
        <div
          ref={ref}
          className="bg-white rounded-[8px] shadow-datepicker-dialog-menu"
        >
          {type === 'single' || type === 'range' ? (
            <div className="py-[8px]">
              <div className="flex gap-md items-center mb-[12px]">
                <Button
                  className="mr-auto"
                  colorScheme="black"
                  leftIcon={<Icon name="IconArrowLeft" size={20} />}
                  size="sm"
                  variant="link"
                  onClick={goToPrevMonth}
                />
                <Dropdown
                  items={[monthOptions]}
                  selectedIndex={selectedMonthIndex}
                  label={
                    <button
                      className="flex items-center gap-4 font-semibold"
                      type="button"
                    >
                      {fromMonthData.name}
                      <DropdownIcon size={16} />
                    </button>
                  }
                />
                <Dropdown
                  items={[yearOptions]}
                  selectedIndex={selectedYearIndex}
                  label={
                    <button
                      className="flex items-center gap-4 font-semibold"
                      type="button"
                    >
                      {from.getFullYear()}
                      <DropdownIcon size={16} />
                    </button>
                  }
                />
                <Button
                  className="ml-auto"
                  colorScheme="black"
                  leftIcon={<Icon name="IconArrowRight" size={20} />}
                  size="sm"
                  variant="link"
                  onClick={goToNextMonth}
                />
              </div>
              <div>
                <Month month={from.getMonth()} year={from.getFullYear()} />
              </div>
              <div className="grid grid-cols-2 gap-md p-[10px]">
                <Button isRounded size="sm" variant="outline" onClick={reset}>
                  Cancel
                </Button>
                <Button isRounded size="sm" onClick={emitChange}>
                  Save
                </Button>
              </div>
            </div>
          ) : type === 'simple' ? (
            <></>
          ) : (
            <></>
          )}
        </div>
      </DatepickerContext.Provider>
    );
  }
);
Datepicker.displayName = 'Datepicker';

interface MonthProps {
  month: number;
  year: number;
}

const Month: React.FC<MonthProps> = ({ month, year }) => {
  const { isLeapYear } = React.useContext(DatepickerContext);
  const monthData = getMonths(isLeapYear)[month];
  const firstDayDate = new Date(year, month, 1);
  const offset = React.useMemo(() => {
    return Array.from({ length: firstDayDate.getDay() }, (_, i) => i);
  }, [firstDayDate]);
  const days = React.useMemo(() => {
    return Array.from({ length: monthData.days }, (_, i) => i + 1);
  }, [monthData]);

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="bg-[#F2F2F7] grid grid-cols-7 py-1">
        {Days.map((day, i) => (
          <Paragraph
            key={i}
            className="text-center font-semibold text-[#808080] uppercase"
            size="xs"
          >
            {day.slice(0, 3)}
          </Paragraph>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {offset.map((_, i) => (
          <div key={i}></div>
        ))}
        {days.map((day, i) => (
          <Day key={i} day={day} month={month} year={year} />
        ))}
      </div>
    </div>
  );
};

interface DayProps {
  day: number;
  month: number;
  year: number;
}

const Day: React.FC<DayProps> = ({ day, month, year }) => {
  const { today, selected, hovered, rangeStep, selectDate, setHovered } =
    React.useContext(DatepickerContext);

  const date = React.useMemo(
    () => new Date(year, month, day),
    [year, month, day]
  );
  const isToday = React.useMemo(() => isSameDay(today, date), [today, date]);
  const isSelected = React.useMemo(() => {
    if (Array.isArray(selected)) {
      return (
        isSameDay(selected[0] as Date, date) ||
        isSameDay(selected[1] as Date, date)
      );
    }
    return isSameDay(selected as Date, date);
  }, [selected, date]);
  const isInRange = React.useMemo(() => {
    if (!Array.isArray(selected)) return false;
    if (!hovered && (!selected[0] || !selected[1])) return false;
    return (
      isAfter(date, selected[0] as Date, true) &&
      isAfter(hovered ?? (selected[1] as Date), date, true)
    );
  }, [date, selected, hovered]);
  const isStart = React.useMemo(() => {
    if (!Array.isArray(selected)) return false;
    return isSameDay(selected[0] as Date, date);
  }, [selected, date]);
  const isEnd = React.useMemo(() => {
    if (!Array.isArray(selected)) return false;
    return isSameDay(hovered ?? (selected[1] as Date), date);
  }, [selected, date, hovered]);

  return (
    <div
      className="h-[40px] relative grid place-items-center cursor-pointer group/day"
      onClick={() => selectDate(date)}
      onMouseEnter={() => {
        if (rangeStep === 'to') setHovered(date);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={`absolute left-0 w-1/2 h-[30px] top-1/2 -translate-y-1/2 group-hover/day:bg-pink-100 ${
          isInRange && (!isStart || !isSelected) ? 'bg-pink-100' : ''
        }`}
      />
      <div
        className={`absolute right-0 w-1/2 h-[30px] top-1/2 -translate-y-1/2 group-hover/day:bg-pink-100 ${
          isInRange && (!isEnd || !isSelected) ? 'bg-pink-100' : ''
        }`}
      />
      <div
        className={`text-[14px] grid place-items-center relative font-semibold w-[32px] h-[32px] rounded-full ${
          isSelected
            ? 'bg-pink-700 text-white'
            : isToday
            ? 'bg-pink-100'
            : isInRange
            ? 'text-[#666666]'
            : 'text-[#808080] group-hover/day:text-[#666666]'
        }`}
      >
        {day}
      </div>
    </div>
  );
};

interface DatepickerContextAttributes {
  today: Date;
  isLeapYear: boolean;

  from: Date;
  setFrom: React.Dispatch<React.SetStateAction<Date>>;

  to: Date | null;
  setTo: React.Dispatch<React.SetStateAction<Date | null>>;

  hovered: Date | null;
  setHovered: React.Dispatch<React.SetStateAction<Date | null>>;

  selected: DatepickerSelected;
  selectDate: (date: Date) => void;

  type: DatepickerType;
  rangeStep: 'from' | 'to';
}

const DatepickerContext = React.createContext({} as DatepickerContextAttributes);

const Days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

const getMonths = (isLeapYear = false) =>
  [
    { name: 'January', days: 31 },
    { name: 'February', days: isLeapYear ? 29 : 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ] as const;
// type Month = typeof getMonths extends (isLeapYear: true) => infer R ? R[number] : never;
// type MonthName = Month['name'];

// @ts-ignore
// type Month<Index> = typeof getMonths extends (isLeapYear: true) => infer R ? R[Index] : never;
// type MonthName<Index extends number = number> = Month<Index>['name'];
// type MonthDays<Index extends number = number> = Month<Index>['days'];
